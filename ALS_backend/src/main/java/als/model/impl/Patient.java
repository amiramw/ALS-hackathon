package als.model.impl;

/**
 * @author I031820
 *
 */


import java.util.Calendar;
import java.util.Date;

import als.model.IPatient;
import als.util.Gender;

public class Patient implements IPatient{
	private String mEmail;
	private String mFirstName;
	private String mLastName;
	private Calendar mCreationDate;
	private Gender mGender;
	private Calendar mBirthday;
	private Calendar mDiagnoseDate;
	
	public Patient(String email,String firstname,String lastname, Date creationdate,Gender gender, Date birthday,Date diagnosedate){
		
		this.mEmail = email;
		this.mFirstName = firstname;
		this.mLastName=lastname;
	
		this.mCreationDate = Calendar.getInstance();
		this.mCreationDate.setTime(creationdate);
	
		this.mGender = gender;
		
		this.mBirthday = Calendar.getInstance();
		this.mBirthday.setTime(birthday);
		
		this.mDiagnoseDate = Calendar.getInstance();
		this.mDiagnoseDate.setTime(diagnosedate);
	
	}
	
	@Override
	public String getEmail() {
		return this.mEmail;
	}
	
	@Override
	public String getFirstName() {
		return this.mFirstName;
	}
	
	@Override
	public String getLastName() {
		return this.mLastName;
	}
	
	@Override
	public Calendar getCreationDate() {
		return this.mCreationDate;
	}
	
	@Override
	public Gender getGender() {
		return this.mGender;
	}
	
	@Override
	public Calendar getBirhtday() {
		return this.mBirthday;
	}
	@Override
	public Calendar getDiagnoseDate() {
		return this.mDiagnoseDate;
	}
	
	
}
