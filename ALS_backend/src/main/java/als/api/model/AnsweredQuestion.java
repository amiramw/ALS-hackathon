package als.api.model;

public class AnsweredQuestion {
	int questionId;
	int answerId;
	public int getQuestionId() {
		return questionId;
	}
	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}
	public int getAnswer() {
		return answerId;
	}
	public void setAnswer(int answerId) {
		this.answerId = answerId;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	String remark;

}
