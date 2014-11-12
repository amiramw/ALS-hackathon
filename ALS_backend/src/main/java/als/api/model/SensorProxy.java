package als.api.model;

import org.springframework.web.multipart.MultipartFile;

import als.util.Sensor;

public class SensorProxy {

	private Sensor mTaskId;
	private String mEmail;
	private MultipartFile mData;
	
	public int getTaskId() {
		return this.mTaskId.getValue();
	}
	
	public void setTaskId(int taskId) {
		
		this.mTaskId = Sensor.getSensor(taskId, Sensor.PAINT);
	}
	
	public Sensor getSensor(){
		return this.mTaskId;
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
