package als.persistence.dao.jdbc;

/**
 * @author I031820
 *
 */

import java.util.UUID;

import org.springframework.dao.DataAccessException;

import als.model.IAnsweredQuestion;
import als.model.impl.Answer;
import als.model.impl.FormQuestionnaire;
import als.persistence.dao.IPatientFormDAO;

class PatientForm extends PatientQuestionnaire implements IPatientFormDAO{

	@Override
	public void create(FormQuestionnaire questionnaire) {
		if(questionnaire!=null){
			try{
				Integer id = getPatientId(questionnaire.getPatientEmail());// get the patient unique id;
				
				if(id==null){
					System.out.println("Failed to created FormQuestionnaire for email = "+ questionnaire.getPatientEmail() +" could not find user id in the DB");
					return;
				}

				
				String ext_id = UUID.randomUUID().toString();
				
				IAnsweredQuestion def = new Answer();
				
				String SQL = "insert into tbl_form (id, SubmitionDate, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, EXT_ID) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
				jdbcTemplateObject.update( SQL, 
											id, 
											questionnaire.getSubmissionTime(),
											questionnaire.getAnswerForQuestion(1,def).getAnswer(),
											questionnaire.getAnswerForQuestion(2,def).getAnswer(),
											questionnaire.getAnswerForQuestion(3,def).getAnswer(),
											questionnaire.getAnswerForQuestion(4,def).getAnswer(),
											questionnaire.getAnswerForQuestion(5,def).getAnswer(),
											questionnaire.getAnswerForQuestion(6,def).getAnswer(),
											questionnaire.getAnswerForQuestion(7,def).getAnswer(),
											questionnaire.getAnswerForQuestion(8,def).getAnswer(),
											questionnaire.getAnswerForQuestion(9,def).getAnswer(),
											questionnaire.getAnswerForQuestion(10,def).getAnswer(),
											questionnaire.getAnswerForQuestion(11,def).getAnswer(),
											questionnaire.getAnswerForQuestion(12,def).getAnswer(),
											ext_id);			
				System.out.println("Created Questionnaire Record Time = "+questionnaire.getSubmissionTime() + " For patient" + questionnaire.getPatientEmail());
			}catch(DataAccessException exp){
				System.out.println("Faile to Create form questionnare record reason:" + exp.getLocalizedMessage());
			}
		}
		
	}

}
