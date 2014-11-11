package als.persistence.dao.offline;

import java.util.List;

import als.model.ITask;
import als.persistence.dao.ITaskDAO;

public class TasksDAO extends BaseCon implements ITaskDAO {

	@Override
	public List<ITask> getLastSubmittedTasks(String email) {
	
		return null;
	}

}
