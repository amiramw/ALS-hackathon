package als.persistence.dao.offline;

/**
 * @author I031820
 *
 */

import java.sql.Timestamp;
import java.util.List;

import als.model.ITask;
import als.model.impl.AbstractQuestionnaire;
import als.persistence.dao.IPatientQuestionnaireDAO;

class PatientQuestionnaire extends BaseCon implements IPatientQuestionnaireDAO{



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
	public List<ITask> getLastSubmitedQuestionnaires(Integer id) {
		return null;
	}

	@Override
	public List<ITask> getLastSubmitedQuestionnaires(String email) {
		return null;
	}

}
