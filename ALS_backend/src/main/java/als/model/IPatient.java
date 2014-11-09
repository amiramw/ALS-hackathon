package als.model;

import java.util.Calendar;

import als.util.Gender;

public interface IPatient {
	String getEmail();
	String getFirstName();
	String getLastName();
	Calendar getCreationDate();
	Gender getGender();
	Calendar getBirhtday();
	Calendar getDiagnoseDate();
	
}
