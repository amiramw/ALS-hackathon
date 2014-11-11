package als.persistence.dao.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;

import als.model.ITask;
import als.persistence.dao.ITaskDAO;

public class TaskDAO extends BaseCon implements ITaskDAO {

	@Override
	public List<ITask> getLastSubmittedTasks(String email) {
		List<ITask> tests = null;
		try {
			String SQL = "select SensorType, SubmittionDate from tbl_sensor 	";
			tests = jdbcTemplateObject.query(SQL, new TaskMapper());
		} catch (DataAccessException exp) {
			System.out.println("Faile to list all Patients reason:"
					+ exp.getLocalizedMessage());
		}
		return tests;
	}

	private class TaskMapper implements RowMapper<ITask> {
		public als.model.impl.Task mapRow(ResultSet rs, int rowNum)
				throws SQLException {
			als.model.impl.Task test = new als.model.impl.Task(
					rs.getString("SensorType"), rs.getDate("SubmitionDate"));
			return test;
		}
	}
}
