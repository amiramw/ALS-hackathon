package als.model;

import java.util.Date;
import java.util.List;

public interface AnsweredQuestionaire {

	String getPatientEmail();

	Date getSubmissionTime();

	List<AnsweredQuestion> getAnsweredQuestions();

}
