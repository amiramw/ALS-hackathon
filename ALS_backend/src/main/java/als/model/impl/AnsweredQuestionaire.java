package als.model.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import als.model.IAnsweredQuestionaire;

public class AnsweredQuestionaire implements IAnsweredQuestionaire {

	String _email;
	Date _time = new Date();
	ArrayList<AnsweredQuestion> _questions = new ArrayList<AnsweredQuestion>();

	@Override
	public String getPatientEmail() {
		return _email;
	}

	public void setPatientEmail(String v) {
		_email = v;
	}

	@Override
	public Date getSubmissionTime() {
		return _time;
	}

	@Override
	public List<AnsweredQuestion> getAnsweredQuestions() {
		return _questions;
	}

}
