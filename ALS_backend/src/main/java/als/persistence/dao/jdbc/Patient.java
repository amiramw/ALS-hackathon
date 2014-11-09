package als.persistence.dao.jdbc;

/**
 * @author I031820
 *
 */

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;

import als.model.IPatient;
import als.persistence.dao.IPatientDAO;
import als.util.Gender;

class Patient extends BaseCon implements
		IPatientDAO {

	@Override
	public void create(IPatient patient) {
		try{
			/*String email = patient.getEmail();
			String SQL = "select id from tbl_patient where email = ?";
			Integer hasId = jdbcTemplateObject.queryForObject(SQL,Integer.class, email);
			
			if(hasId!=null){
				//TBD - update the caller that user already exist
				System.out.println("Faile to create Patient record for patient = " + email + " already exist");
				return;	
			}*/
			
			
			
			String SQL = "insert into tbl_patient (	 " + "email," + "LastName,"
					+ "FirstName," + "CreationDate," + "Gender," + "BirthDate,"
					+ "DiagnoseDate) values ( ?, ?, ?, ?, ?,? ,?)";
			jdbcTemplateObject.update(SQL, patient.getEmail(),
					patient.getLastName(), patient.getFirstName(),
					patient.getCreationDate(), patient.getGender().getValue(),
					patient.getBirhtday(), patient.getDiagnoseDate());
			System.out.println("Created Record Email = "
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
		IPatient patient = null;
		try{
			String SQL = "select * from tbl_patient where id = ?";
			patient = jdbcTemplateObject.queryForObject(SQL,
					new Object[] { id }, new PatientMapper());
		}catch(DataAccessException exp){
			System.out.println("Faile to get Patient record for patient = " + id + " reason:" + exp.getLocalizedMessage());
		}
		return patient;
	}

	@Override
	public IPatient getPatient(String email) {
		IPatient patient = null;
		try{
			String SQL = "select * from tbl_patient where email = ?";
			patient = jdbcTemplateObject.queryForObject(SQL,
					new Object[] { email }, new PatientMapper());
		}catch(DataAccessException exp){
			System.out.println("Faile to get Patient record for patient = " + email + " reason:" + exp.getLocalizedMessage());
		}
		return patient;
	}

	@Override
	public List<IPatient> listPatients() {
		List<IPatient> patients = null;
		try{
			String SQL = "select * from tbl_patient";
			patients = jdbcTemplateObject.query(SQL,
					new PatientMapper());
		}catch(DataAccessException exp){
			System.out.println("Faile to list all Patients reason:" + exp.getLocalizedMessage());
		}
		return patients;
	}

	@Override
	public void delete(Integer id) {
		try{
			String SQL = "delete from tbl_patient where id = ?";
			jdbcTemplateObject.update(SQL, id);
			System.out.println("Deleted Record with ID = " + id);
		}catch(DataAccessException exp){
			System.out.println("Faile to Delete patient( "+id+") record reason:" + exp.getLocalizedMessage());
		}
	}

	@Override
	public void delete(String email) {
		try{
			String SQL = "delete from tbl_patient where email = ?";
			jdbcTemplateObject.update(SQL, email);
			System.out.println("Deleted Record with ID = " + email);
		}catch(DataAccessException exp){
			System.out.println("Faile to Delete patient( "+email+") record reason:" + exp.getLocalizedMessage());
		}
	}

	private class PatientMapper implements RowMapper<IPatient> {
		public als.model.impl.Patient mapRow(ResultSet rs, int rowNum) throws SQLException {
			als.model.impl.Patient patient = new als.model.impl.Patient(rs.getString("email"),
					rs.getString("LastName"), rs.getString("FirstName"),
					rs.getDate("CreationDate"), Gender.getGender(rs
							.getShort("Gender")), rs.getDate("BirthDate"),
					rs.getDate("DiagnoseDate"));

			return patient;
		}
	}

	
}
