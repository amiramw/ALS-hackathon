package als.model.impl;

/**
 * @author I031820
 *
 */

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import als.model.IAnsQuestionnaire;
import als.model.IAnsweredQuestion;
import als.util.QuestionnaireType;

public abstract class AbstractQuestionnaire implements IAnsQuestionnaire{
	
	protected String mEmail = null;
	protected Date mSubmissionTime = null;
	protected List<IAnsweredQuestion> mAnswers;
	protected QuestionnaireType mType = null;
	
	public AbstractQuestionnaire(String mail, Date date,QuestionnaireType type,List<IAnsweredQuestion> answers){
		this.mEmail= mail;
		this.mSubmissionTime = date;
		this.mType = type;
		if(answers==null)answers = new ArrayList<IAnsweredQuestion>();
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
	
	public List<IAnsweredQuestion> getAnsweredQuestions(){
		return mAnswers;
	}
	
	public int getAnsweredQuestionsSize(){
		return mAnswers.size();
	}

	public IAnsweredQuestion getAnsweredQuestionsByIndex(int index,IAnsweredQuestion defValue){
		IAnsweredQuestion res = getAnsweredQuestionsByIndex(index);
		if(res==null)res = defValue;
		return res;
	}
	
	public IAnsweredQuestion getAnsweredQuestionsByIndex(int index){
		if(index==0 && index < mAnswers.size()){
			return mAnswers.get(index);
		}
		return null;
	}

}
