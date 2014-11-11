package als.api.model;

import org.springframework.web.multipart.MultipartFile;

public class SensorProxy {

	private int mTaskId;
	private String mEmail;
	private MultipartFile mData;
	
	public int getTaskId() {
		return this.mTaskId;
	}
	public void setTaskId(int taskId) {
		this.mTaskId = taskId;
	}
	public String getEmail() {
		return this.mEmail;
	}
	public void setEmail(String email) {
		this.mEmail = email;
	}
	public MultipartFile getData() {
		return this.mData;
	}
	public void setData(MultipartFile data) {
		this.mData = data;
	}
}
