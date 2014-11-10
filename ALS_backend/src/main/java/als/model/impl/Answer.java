package als.model.impl;

import als.model.IAnsweredQuestion;

public class Answer implements IAnsweredQuestion{
	private Object answer;
	private String remark;

	public Answer() {
	}
	public Answer(Object answer, String remark) {
		this.answer = answer;
		this.remark = remark;
	}

	@Override
	public Object getAnswer() {
		return answer;
	}

	@Override
	public String getRemark() {
		return remark;
	}

}
