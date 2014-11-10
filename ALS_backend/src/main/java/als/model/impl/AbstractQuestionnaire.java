package als.model.impl;

/**
 * @author I031820
 *
 */

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import als.model.IAnsQuestionnaire;
import als.model.IAnsweredQuestion;
import als.util.QuestionnaireType;

public abstract class AbstractQuestionnaire implements IAnsQuestionnaire{
	
	
	protected String mEmail = null;
	protected Date mSubmissionTime = null;
	protected Map<Integer, IAnsweredQuestion> mAnswers;
	protected QuestionnaireType mType = null;
	
	public AbstractQuestionnaire(String mail, Date date,QuestionnaireType type,Map<Integer, IAnsweredQuestion> answers){
		this.mEmail= mail;
		this.mSubmissionTime = date;
		this.mType = type;
		if(answers==null)answers = new HashMap<Integer, IAnsweredQuestion>();
		this.mAnswers = answers; 
	}
	
	public void setEmail(String email){
		this.mEmail= email;
	}
	
	public void setSubmissionTime(Date date){
		this.mSubmissionTime= date;
	}
	
	public void setQuestionnaireType(QuestionnaireType type){
		this.mType= type;
	}
	
	public String getPatientEmail(){
		return this.mEmail;
	}
	
	public Date getSubmissionTime(){
		return this.mSubmissionTime;
		
	}
	
	public QuestionnaireType getQuestionnaireType(){
		return this.mType;
		
	}
	
	@Override
	public IAnsweredQuestion getAnswerForQuestion(int questionNum, IAnsweredQuestion def) {
		IAnsweredQuestion res = mAnswers.get(questionNum);
		if (res==null) {
			res = def;
		}
		return res;
	}

}
