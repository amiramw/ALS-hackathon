package als.persistence.dao.jdbc;

/**
 * @author I031820
 *
 */

import java.util.UUID;

import org.springframework.dao.DataAccessException;

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
				
				String SQL = "insert into tbl_form (id, SubmitionDate, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, EXT_ID) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
				jdbcTemplateObject.update( SQL, 
											id, 
											questionnaire.getSubmissionTime(),
											questionnaire.getAnsweredQuestionsByIndex(1).getAnswer(),
											questionnaire.getAnsweredQuestionsByIndex(2).getAnswer(),
											questionnaire.getAnsweredQuestionsByIndex(3).getAnswer(),
											questionnaire.getAnsweredQuestionsByIndex(4).getAnswer(),
											questionnaire.getAnsweredQuestionsByIndex(5).getAnswer(),
											questionnaire.getAnsweredQuestionsByIndex(6).getAnswer(),
											questionnaire.getAnsweredQuestionsByIndex(7).getAnswer(),
											questionnaire.getAnsweredQuestionsByIndex(8).getAnswer(),
											questionnaire.getAnsweredQuestionsByIndex(9).getAnswer(),
											questionnaire.getAnsweredQuestionsByIndex(10).getAnswer(),
											questionnaire.getAnsweredQuestionsByIndex(11).getAnswer(),
											questionnaire.getAnsweredQuestionsByIndex(12).getAnswer(),
											ext_id);			
				System.out.println("Created Questionnaire Record Time = "+questionnaire.getSubmissionTime() + " For patient" + questionnaire.getPatientEmail());
			}catch(DataAccessException exp){
				System.out.println("Faile to Create form questionnare record reason:" + exp.getLocalizedMessage());
			}
		}
		
	}

}
