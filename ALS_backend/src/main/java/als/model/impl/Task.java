package als.model.impl;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.CalendarSerializer;

import als.model.ITask;

public class Task implements ITask, Serializable {
	
	private static final long serialVersionUID = -7788619177798333713L;
			
	private String mId;
	private Calendar mLastSubmittedDate;

	public Task(String taskId, Date lastSubmittedDate){
		this.mId  = taskId;
		this.mLastSubmittedDate = Calendar.getInstance();
		this.mLastSubmittedDate.setTime(lastSubmittedDate) ;
	}
	
	@Override
	public String getTaskId() {
		return mId;
	}

	@Override
	@JsonSerialize(using=CalendarSerializer.class)
	public Calendar getLastSubmittedDate() {
		return mLastSubmittedDate;
	}

}
