package als.persistence.dao.offline;

/**
 * @author I031820
 *
 */

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.dao.DataAccessException;

import als.model.IPatient;
import als.persistence.dao.IPatientDAO;
import als.util.Gender;

class Patient extends BaseCon implements IPatientDAO {
	
	IPatient mOfflinePatient=null;
	
	@SuppressWarnings("deprecation")
	public Patient() {
		mOfflinePatient = new als.model.impl.Patient("junk.junk@gmail.com","John","Doe", new Date(System.currentTimeMillis()),Gender.MALE, new Date(1921,12,12),new Date(1973,12,12));
	}
	
	@Override
	public void create(IPatient patient) {
		try{
			
			String str= patient.getLastName();
			if(str==null)
				System.out.println("Created questionnaire, missing patient lastname object for offline flow");
			
			str = patient.getFirstName();
			if(str==null)
				System.out.println("Created questionnaire, missing patient first name object for offline flow");
			
			
			Calendar calendar = patient.getCreationDate();
			if(calendar==null)
				System.out.println("Created questionnaire, missing creation date object for offline flow");
			
			Gender gender = patient.getGender();
			if(gender==null)
				System.out.println("Created questionnaire, missing gender object for offline flow");
			
			calendar = patient.getBirhtday();
			if(calendar==null)
				System.out.println("Created questionnaire, missing birthday date object for offline flow");
			
			calendar = patient.getDiagnoseDate();
			if(calendar==null)
				System.out.println("Created questionnaire, missing creation date object for offline flow");
			
			
			System.out.println("Created Record  Email = "
					+ patient.getEmail() + " LastName = " + patient.getLastName()
					+ "FirstName" + patient.getFirstName() + " CreationDate = "
					+ patient.getCreationDate() + " Gender = "
					+ patient.getGender().getDisplayText() + " Birthday = "
					+ patient.getBirhtday() + " DiagnoseDate"
					+ patient.getDiagnoseDate());
			
		}catch(DataAccessException exp){
			System.out.println("Faile to created Record for patient = " + patient.getEmail() + " reason:" + exp.getLocalizedMessage());
		}
	}

	@Override
	public IPatient getPatient(Integer id) {
		return mOfflinePatient;
	}

	@Override
	public IPatient getPatient(String email) {
		return mOfflinePatient;
	}

	@Override
	public List<IPatient> listPatients() {
		List<IPatient> patients = new ArrayList<IPatient>();
		patients.add(mOfflinePatient);
		return patients;
	}

	@Override
	public void delete(Integer id) {
		try{
			System.out.println("Deleted Record with ID = " + id);
		}catch(DataAccessException exp){
			System.out.println("Faile to Delete patient( "+id+") record reason:" + exp.getLocalizedMessage());
		}
	}

	@Override
	public void delete(String email) {
		try{
			System.out.println("Deleted Record with ID = " + email);
		}catch(DataAccessException exp){
			System.out.println("Faile to Delete patient( "+email+") record reason:" + exp.getLocalizedMessage());
		}
	}

}
