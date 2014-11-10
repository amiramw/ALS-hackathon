package als.model;

/**
 * @author I031820
 *
 */

import java.util.Date;

import als.util.QuestionnaireType;

public interface IAnsQuestionnaire {
	public String getPatientEmail();
	public Date getSubmissionTime();
	public IAnsweredQuestion getAnswerForQuestion(int questionNum,IAnsweredQuestion defValue);
	public QuestionnaireType getQuestionnaireType();
}
