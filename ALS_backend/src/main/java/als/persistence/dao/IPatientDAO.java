package als.persistence.dao;

/**
 * @author I031820
 *
 */

import java.util.List;

import als.model.IPatient;

public interface IPatientDAO extends BaseDAO {
	 
	   
	   /** 
	    * This is the method to be used to create
	    * a record in the Patient table.
	    */
	   public void create(IPatient patient);
	   
	   /** 
	    * This is the method to be used to list down
	    * a record from the Patient table corresponding
	    * to a passed patient id/email.
	    */
	   public IPatient getPatient(Integer id);
	   public IPatient getPatient(String email);
	   
	   /** 
	    * This is the method to be used to list down
	    * all the records from the Patient table.
	    */
	   public List<IPatient> listPatients();
	   /** 
	    * This is the method to be used to delete
	    * a record from the Patient table corresponding
	    * to a passed patient id/email.
	    */
	   public void delete(Integer id);
	   public void delete(String email);

}
