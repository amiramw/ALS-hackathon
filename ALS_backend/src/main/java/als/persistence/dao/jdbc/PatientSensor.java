package als.persistence.dao.jdbc;

/**
 * @author I031820
 *
 */

import java.util.UUID;

import org.springframework.dao.DataAccessException;

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
				
				String ext_id = UUID.randomUUID().toString();
				
				String SQL = "insert into tbl_sensor (id, SubmitionDate, SensorType, Data, EXT_ID) values (?, ?, ?, ?, ?)";
				jdbcTemplateObject.update( SQL, 
											id, 
											questionnaire.getSubmissionTime(),
											questionnaire.getSensorType().getValue(),
											questionnaire.getAnswerForQuestion(0, null),
											ext_id);
					
				System.out.println("Created Questionnaire Record ID= "+ id+" Time = "+questionnaire.getSubmissionTime() + " For patient" + questionnaire.getPatientEmail());
			}catch(DataAccessException exp){
				System.out.println("Faile to Create sensor questionnare record reason:" + exp.getLocalizedMessage());
			}
		}
		
	}

}
