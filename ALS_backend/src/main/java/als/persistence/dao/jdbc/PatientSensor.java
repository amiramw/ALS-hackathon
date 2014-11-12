package als.persistence.dao.jdbc;

/**
 * @author I031820
 *
 */

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.SqlLobValue;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;

import com.fasterxml.jackson.annotation.JsonSubTypes.Type;

import als.model.ITask;
import als.model.impl.AbstractQuestionnaire;
import als.model.impl.SensorQuestionnaire;
import als.persistence.dao.IPatientSensorDAO;


class PatientSensor extends PatientQuestionnaire implements IPatientSensorDAO{

	@Override
	public void create(SensorQuestionnaire questionnaire) {
		if(questionnaire!=null){
			
			try{
				Integer id = getPatientId(questionnaire.getPatientEmail());// get the patient unique id;
				
				if(id==null){
					System.out.println("Failed to created SensorQuestionnaire for email = "+ questionnaire.getPatientEmail() +" could not find user id in the DB");
					return;
				}
				
				
				long ext_id = new Random().nextLong();
				LobHandler lobHandler = new DefaultLobHandler();
				
				String SQL = "insert into tbl_sensor (id, SubmitionDate, SensorType, Data,  EXT_ID) values (?, ?, ?, ?, ?)";
				jdbcTemplateObject.update( SQL,new Object[] { 
											id, 
											questionnaire.getSubmissionTime(),
											questionnaire.getSensorType().getValue(),
											new SqlLobValue((byte[]) questionnaire.getAnswerForQuestion(0, null).getAnswer(),lobHandler),
											ext_id},
											new int[]{Types.BIGINT,Types.TIMESTAMP, Types.CHAR,Types.BLOB, Types.BIGINT});
					
				System.out.println("Created Questionnaire Record ID= "+ id+" Time = "+questionnaire.getSubmissionTime() + " For patient" + questionnaire.getPatientEmail());
			}catch(DataAccessException exp){
				System.out.println("Failed to Create sensor questionnare record reason:" + exp.getLocalizedMessage());
			}
		}
		
	}
	
	@Override
	public List<ITask> getLastSubmitedQuestionnaires(Integer id) {
		List<ITask> tasks = null;
		try{
			String SQL = "select a.SensorType, a.SubmitionDate from ("
					+ "select SensorType, max(SubmitionDate) as maxDate from tbl_sensor  where id =? group by SensorType ) as b "
					+ "inner join (select * from tbl_sensor where id=? ) as a on a.SensorType = b.Sensortype and a.SubmitionDate = b.maxDate ";
			tasks = jdbcTemplateObject.query(SQL,new Object[]{ id,id} , new TaskMapper());
		}catch(DataAccessException exp){
			System.out.println("Failed to get last submitted  Questionnaires from  record for patient = " + id + " reason:" + exp.getLocalizedMessage());
		}
		return tasks;
	}


	@Override
	public List<ITask> getLastSubmitedQuestionnaires(String email) {
		Integer id = getPatientId(email);// get the patient unique id;
		
		return this.getLastSubmitedQuestionnaires(id);
	}
	
	private class TaskMapper implements RowMapper<ITask> {
		public als.model.impl.Task mapRow(ResultSet rs, int rowNum)
				throws SQLException {
			als.model.impl.Task test = new als.model.impl.Task(
					rs.getString("SensorType"), rs.getDate("SubmitionDate"));
			return test;
		}
	}

}
