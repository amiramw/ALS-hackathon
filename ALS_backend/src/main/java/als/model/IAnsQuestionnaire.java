package als.model;

/**
 * @author I031820
 *
 */

import java.util.Date;
import java.util.List;

import als.util.QuestionnaireType;

public interface IAnsQuestionnaire {
	public String getPatientEmail();
	public Date getSubmissionTime();
	public List<IAnsweredQuestion> getAnsweredQuestions();
	public int getAnsweredQuestionsSize();
	public QuestionnaireType getQuestionnaireType();
}
