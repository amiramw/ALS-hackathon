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
				
				Object answer = questionnaire.getAnswerForQuestion(1,null).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 1 object for offline flow");
				
				answer = questionnaire.getAnswerForQuestion(2, null).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 2 object for offline flow");
				
				answer = questionnaire.getAnswerForQuestion(3, null).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 3 object for offline flow");
				
				answer = questionnaire.getAnswerForQuestion(4, null).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 4 object for offline flow");
				
				answer = questionnaire.getAnswerForQuestion(5, null).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 5 object for offline flow");
				
				answer = questionnaire.getAnswerForQuestion(6, null).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 6 object for offline flow");
				
				answer = questionnaire.getAnswerForQuestion(7, null).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 7 object for offline flow");
				
				answer = questionnaire.getAnswerForQuestion(8, null).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 8 object for offline flow");
				
				answer = questionnaire.getAnswerForQuestion(9, null).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 9 object for offline flow");
				
				answer = questionnaire.getAnswerForQuestion(10, null).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 10 object for offline flow");
				
				answer = questionnaire.getAnswerForQuestion(11, null).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 11 object for offline flow");
				
				answer = questionnaire.getAnswerForQuestion(12, null).getAnswer();
				if(answer==null)
					System.out.println("Created questionnaire, missing answer number 12 object for offline flow");
				
				System.out.println("Created Questionnaire for offline flow, Record ID= "+ id+" Time = "+questionnaire.getSubmissionTime() + " For patient" + questionnaire.getPatientEmail());
				
			} catch(DataAccessException exp) {
				System.out.println("Faile to Create form questionnare for offline flow, record reason:" + exp.getLocalizedMessage());
			}
		}
		
	}

}
