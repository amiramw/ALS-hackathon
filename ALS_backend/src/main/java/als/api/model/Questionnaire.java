package als.api.model;

import java.util.List;

public class Questionnaire {
	protected String email = null;
	protected List<AnsweredQuestion> answers;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<AnsweredQuestion> getAnswers() {
		return answers;
	}

	public void setAnswers(List<AnsweredQuestion> answers) {
		this.answers = answers;
	}

	public Questionnaire() {
	}
}
