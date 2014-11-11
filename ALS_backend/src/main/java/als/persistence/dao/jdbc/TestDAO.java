package als.persistence.dao.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;

import als.model.ITest;
import als.persistence.dao.ITestDAO;

public class TestDAO extends BaseCon implements ITestDAO {

	@Override
	public List<ITest> getLastSubmittedTests(String email) {
		List<ITest> tests = null;
		try {
			String SQL = "select SensorType, SubmittionDate from tbl_sensor 	";
			tests = jdbcTemplateObject.query(SQL, new TestMapper());
		} catch (DataAccessException exp) {
			System.out.println("Faile to list all Patients reason:"
					+ exp.getLocalizedMessage());
		}
		return tests;
	}

	private class TestMapper implements RowMapper<ITest> {
		public als.model.impl.Test mapRow(ResultSet rs, int rowNum)
				throws SQLException {
			als.model.impl.Test test = new als.model.impl.Test(
					rs.getString("SensorType"), rs.getDate("SubmitionDate"));
			return test;
		}
	}
}
