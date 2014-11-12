package als.persistence.dao.jdbc;

/**
 * @author I031820
 *
 */

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;

import als.model.ITask;
import als.model.impl.AbstractQuestionnaire;
import als.model.impl.FormQuestionnaire;
import als.persistence.dao.IPatientQuestionnaireDAO;

class PatientQuestionnaire extends BaseCon implements IPatientQuestionnaireDAO{

	protected Integer getPatientId(String email){
		Integer id = null;
		try{
			String SQL = "select id from tbl_patient where email = ?";
			id = jdbcTemplateObject.queryForObject(SQL,Integer.class, email);
		}catch(DataAccessException exp){
			System.out.println("Faile to get Patient record for patient = " + email + " reason:" + exp.getLocalizedMessage());
		}
		return id;
	}


	@Override
	public AbstractQuestionnaire getQuestionnaire(Integer id, Integer date) {
		return null;
	}

	@Override
	public AbstractQuestionnaire getQuestionnaire(String email, Integer date) {
		return null;
	}

	@Override
	public List<AbstractQuestionnaire> listQuestionnaire() {
		return null;
	}
	
	
	public List<AbstractQuestionnaire> getLastSubmittedQuestionnaire(String email) {
		
		
		return null;
	}

	@Override
	public void delete(Integer id, Integer date) {
		
	}

	@Override
	public void delete(String email, Integer date) {
		
	}


	@Override
	public List<ITask> getLastSubmitedQuestionnaires(Integer id) {
		List<ITask> tasks = null;
		try{
			String SQL = "SELECT SubmitionDate FROM tbl_form WHERE id = ? ORDER By SubmitionDate DESC LIMIT 1  ";
			tasks = jdbcTemplateObject.query(SQL,new Object[]{ id} , new TaskMapper());
		}catch(DataAccessException exp){
			System.out.println("Failed to get last submitted  timestamp from  record for patient = " + id + " reason:" + exp.getLocalizedMessage());
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
					"0", rs.getDate("SubmitionDate"));
			return test;
		}
	}

}
