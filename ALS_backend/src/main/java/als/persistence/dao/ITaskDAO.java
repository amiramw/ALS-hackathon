package als.persistence.dao;

import java.util.List;

import als.model.ITask;


public interface ITaskDAO {

	public List<ITask> getLastSubmittedTasks(String email);
}
