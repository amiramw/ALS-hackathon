package als.model.impl;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.CalendarSerializer;

import als.model.ITest;

public class Test implements ITest, Serializable {
	
	private static final long serialVersionUID = -7788619177798333713L;
			
	private String mId;
	private Calendar mLastSubmittedDate;

	public Test(String id, Date lastSubmittedDate){
		this.mId  = id;
		this.mLastSubmittedDate = Calendar.getInstance();
		this.mLastSubmittedDate.setTime(lastSubmittedDate) ;
	}
	
	@Override
	public String getId() {
		return mId;
	}

	@Override
	@JsonSerialize(using=CalendarSerializer.class)
	public Calendar getLastSubmittedDate() {
		return mLastSubmittedDate;
	}

}
