package als.persistence.dao.offline;

/**
 * @author I031820
 *
 */

import java.util.List;

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

}
