package als.persistence.dao;

/**
 * @author I031820
 *
 */


import java.sql.Timestamp;
import java.util.List;

import als.model.ITask;
import als.model.impl.AbstractQuestionnaire;



public interface IPatientQuestionnaireDAO extends BaseDAO {
	
	
	/** 
	 * This is the method to be used to list down
	 * a record from the Q table corresponding
	 * to a passed patient id/email.
	 */
	public AbstractQuestionnaire getQuestionnaire(Integer id,Integer date);
	public AbstractQuestionnaire getQuestionnaire(String email, Integer date);
	   
	/** 
	 * This is the method to be used to list down
	 * all the records from the Q table.
	 */
	 public List<AbstractQuestionnaire> listQuestionnaire();
	 
	 /** 
	  * This is the method to be used to delete
	  * a record from the Q table corresponding
	  * to a passed patient id/email.
	  */
	 public void delete(Integer id,Integer date);
	 public void delete(String email,Integer date);
	 
	 /** 
	  * This is the method to be used to get 
	  * the last submitted questionnaire table corresponding
	  * to a passed patient id/email.
	  */
	 public List<ITask> getLastSubmitedQuestionnaires(Integer id);
	 public List<ITask> getLastSubmitedQuestionnaires(String email);
	   
}
