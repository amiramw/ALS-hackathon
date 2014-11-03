package als.model;

import java.util.Date;
import java.util.List;

public interface IAnsweredQuestionnaire {

	String getPatientEmail();

	Date getSubmissionTime();

	List<? extends IAnsweredQuestion> getAnsweredQuestions();

}
