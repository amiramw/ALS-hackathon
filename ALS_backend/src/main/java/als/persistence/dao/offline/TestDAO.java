package als.persistence.dao.offline;

import java.util.List;

import als.model.ITest;
import als.persistence.dao.ITestDAO;

public class TestDAO extends BaseCon implements ITestDAO {

	@Override
	public List<ITest> getLastSubmittedTests(String email) {
	
		return null;
	}

}
