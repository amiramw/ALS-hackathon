package als.persistence.dao;

import java.util.List;

import als.model.ITest;


public interface ITestDAO {

	public List<ITest> getLastSubmittedTests(String email);
}
