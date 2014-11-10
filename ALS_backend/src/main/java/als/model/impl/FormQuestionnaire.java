package als.model.impl;

/**
 * @author I031820
 *
 */

import java.util.Date;
import java.util.Map;

import als.model.IAnsweredQuestion;
import als.util.QuestionnaireType;

public class FormQuestionnaire extends AbstractQuestionnaire{
	public FormQuestionnaire(String mail, Date date,QuestionnaireType type,Map<Integer, IAnsweredQuestion> answers) {
		super(mail, date, QuestionnaireType.FORM, answers);
	}

	public void setAnswers(Map<Integer, IAnsweredQuestion> lst){
		this.mAnswers= lst;
	}
	
	public void addAnswers(Integer id, IAnsweredQuestion answer){
		this.mAnswers.put(id, answer);
	}
}
