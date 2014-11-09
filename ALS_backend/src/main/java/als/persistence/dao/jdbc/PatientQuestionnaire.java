package als.persistence.dao.jdbc;

/**
 * @author I031820
 *
 */

import java.sql.Timestamp;
import java.util.List;

import org.springframework.dao.DataAccessException;

import als.model.impl.AbstractQuestionnaire;
import als.persistence.dao.IPatientQuestionnaireDAO;

class PatientQuestionnaire extends BaseCon implements IPatientQuestionnaireDAO{

	protected Integer getPatientId(String email){
		Integer id = null;
		try{
			String SQL = "select id from tbl_patient where email = ?";
			id = jdbcTemplateObject.queryForObject(SQL,Integer.class, email);
		}catch(DataAccessException exp){
			System.out.println("Faile to get Patient record for patient = " + email + " reason:" + exp.getLocalizedMessage());
		}
		return id;
	}


	@Override
	public AbstractQuestionnaire getQuestionnaire(Integer id, Integer date) {
		return null;
	}

	@Override
	public AbstractQuestionnaire getQuestionnaire(String email, Integer date) {
		return null;
	}

	@Override
	public List<AbstractQuestionnaire> listQuestionnaire() {
		return null;
	}

	@Override
	public void delete(Integer id, Integer date) {
		
	}

	@Override
	public void delete(String email, Integer date) {
		
	}


	@Override
	public Timestamp getLastSubmitedQuestionnaire(Integer id) {
		Timestamp timestamp = null;
		try{
			String SQL = "SELECT SubmitionDate FROM tbl_form WHERE id = ? ORDER By SubmitionDate DESC LIMIT 1  ";
			timestamp = jdbcTemplateObject.queryForObject(SQL,Timestamp.class, id);
		}catch(DataAccessException exp){
			System.out.println("Faile to get last submitted  timestamp from  record for patient = " + id + " reason:" + exp.getLocalizedMessage());
		}
		return timestamp;
	}


	@Override
	public Timestamp getLastSubmitedQuestionnaire(String email) {
		Timestamp timestamp = null;
		try{
			String SQL = "SELECT SubmitionDate FROM tbl_form WHERE email = ? ORDER By SubmitionDate DESC LIMIT 1  ";
			timestamp = jdbcTemplateObject.queryForObject(SQL,Timestamp.class, email);
		}catch(DataAccessException exp){
			System.out.println("Faile to get last submitted  timestamp from  record for patient = " + email + " reason:" + exp.getLocalizedMessage());
		}
		return timestamp;
	}

}
