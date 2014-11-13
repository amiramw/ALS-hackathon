package als.api.model;


import java.util.Date;



import als.util.Gender;

public class PatientProxy {
	private String mEmail;
	private String mFirstName;
	private String mLastName;
	private Gender mGender;
	private Date mBirthday;
	private Date mDiagnoseDate;
	
	public String getEmail() {
		return mEmail;
	}
	public void setEmail(String mEmail) {
		this.mEmail = mEmail;
	}
	public String getFirstName() {
		return mFirstName;
	}
	
	public void setFirstName(String mFirstName) {
		this.mFirstName = mFirstName;
	}
	public String getLastName() {
		return mLastName;
	}
	public void setLastName(String mLastName) {
		this.mLastName = mLastName;
	}
	
	
	public Gender getGender() {
		return mGender;
	}
	public void setGender(Gender mGender) {
		this.mGender = mGender;
	}
	public Date getBirthday() {
		return mBirthday;
	}
	public void setBirthday(Date mBirthday) {
		this.mBirthday = mBirthday;
	}
	public Date getDiagnoseDate() {
		return mDiagnoseDate;
	}
	public void setDiagnoseDate(Date mDiagnoseDate) {
		this.mDiagnoseDate = mDiagnoseDate;
	}
	
	
	
}
