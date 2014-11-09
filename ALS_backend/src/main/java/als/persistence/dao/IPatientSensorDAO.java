package als.persistence.dao;


/**
 * @author I031820
 *
 */

import als.model.impl.SensorQuestionnaire;


public interface IPatientSensorDAO extends IPatientQuestionnaireDAO {
		
	   /** 
	    * This is the method to be used to create
	    * a record in the tbl_sesnor table.
	    */
	   public void create(SensorQuestionnaire questionnaire);
	   	   
	   
}
