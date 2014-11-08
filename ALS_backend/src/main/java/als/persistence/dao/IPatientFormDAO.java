package als.persistence.dao;

/**
 * @author I031820
 *
 */

import als.model.impl.FormQuestionnaire;

public interface IPatientFormDAO extends IPatientQuestionnaireDAO {
	
	
	   /** 
	    * This is the method to be used to create
	    * a record in the tbl_form table.
	    */
	   public void create(FormQuestionnaire questionnaire);
	   	   
}
