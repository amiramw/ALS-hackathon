package als.persistence.dao.offline;

/**
 * @author I031820
 *
 */

import org.springframework.dao.DataAccessException;

import als.model.impl.SensorQuestionnaire;
import als.persistence.dao.IPatientSensorDAO;

class PatientSensor extends PatientQuestionnaire implements IPatientSensorDAO{

	@Override
	public void create(SensorQuestionnaire questionnaire) {
		if(questionnaire!=null){
			
			try{
				System.out.println("Created Questionnaire Record Time = "+questionnaire.getSubmissionTime() + " For patient" + questionnaire.getPatientEmail());
			}catch(DataAccessException exp){
				System.out.println("Faile to Create sensor questionnare record reason:" + exp.getLocalizedMessage());
			}
		}
		
	}

}
