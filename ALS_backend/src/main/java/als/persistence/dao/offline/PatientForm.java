package als.persistence.dao.offline;

/**
 * @author I031820
 *
 */

import java.util.Date;
import java.util.UUID;

import org.springframework.dao.DataAccessException;

import als.model.impl.FormQuestionnaire;
import als.persistence.dao.IPatientFormDAO;

class PatientForm extends PatientQuestionnaire implements IPatientFormDAO{

	@Override
	public void create(FormQuestionnaire questionnaire) {
		if(questionnaire!=null){
			try{
				String id = UUID.randomUUID().toString();// Generate the GUID;
				
				Date date = questionnaire.getSubmissionTime();
				if(date==null)
					System.out.println("Created questionnaire, missing submissionTime object for offline flow");
				
				Object answer = questionnaire.getAnsweredQuestionsByIndex(1).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 1 object for offline flow");
				
				answer = questionnaire.getAnsweredQuestionsByIndex(2).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 2 object for offline flow");
				
				answer = questionnaire.getAnsweredQuestionsByIndex(3).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 3 object for offline flow");
				
				answer = questionnaire.getAnsweredQuestionsByIndex(4).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 4 object for offline flow");
				
				answer = questionnaire.getAnsweredQuestionsByIndex(5).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 5 object for offline flow");
				
				answer = questionnaire.getAnsweredQuestionsByIndex(6).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 6 object for offline flow");
				
				answer = questionnaire.getAnsweredQuestionsByIndex(7).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 7 object for offline flow");
				
				answer = questionnaire.getAnsweredQuestionsByIndex(8).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 8 object for offline flow");
				
				answer = questionnaire.getAnsweredQuestionsByIndex(9).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 9 object for offline flow");
				
				answer = questionnaire.getAnsweredQuestionsByIndex(10).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 10 object for offline flow");
				
				answer = questionnaire.getAnsweredQuestionsByIndex(11).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 11 object for offline flow");
				
				answer = questionnaire.getAnsweredQuestionsByIndex(12).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 12 object for offline flow");
				
				System.out.println("Created Questionnaire for offline flow, Record ID= "+ id+" Time = "+questionnaire.getSubmissionTime() + " For patient" + questionnaire.getPatientEmail());
				
			} catch(DataAccessException exp) {
				System.out.println("Faile to Create form questionnare for offline flow, record reason:" + exp.getLocalizedMessage());
			}
		}
		
	}

}
