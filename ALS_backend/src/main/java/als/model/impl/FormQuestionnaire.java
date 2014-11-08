package als.model.impl;

/**
 * @author I031820
 *
 */

import java.util.Date;
import java.util.List;

import als.model.IAnsweredQuestion;
import als.util.QuestionnaireType;

public class FormQuestionnaire extends AbstractQuestionnaire{
	public FormQuestionnaire(String mail, Date date,QuestionnaireType type,List<IAnsweredQuestion> answers) {
		super(mail, date, QuestionnaireType.FORM, answers);
	}

	public void setAnswers(List<IAnsweredQuestion> lst){
		this.mAnswers= lst;
	}
	
	public void addAnswers(IAnsweredQuestion answer){
		this.mAnswers.add(answer);
	}
}
