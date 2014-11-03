package als.model;

import java.util.Date;
import java.util.List;

public interface IAnsweredQuestionaire {

	String getPatientEmail();

	Date getSubmissionTime();

	List<? extends IAnsweredQuestion> getAnsweredQuestions();

}
