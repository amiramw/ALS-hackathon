package als.model.impl;

import als.model.IAnsweredQuestion;

public class AnsweredQuestion implements IAnsweredQuestion {

	private int _quesId;
	private int _answerId;
	private String _remark;

	@Override
	public int getQuestionId() {
		return _quesId;
	}

	public void setQuestionId(int v) {
		_quesId = v;
	}

	@Override
	public int getAnswerId() {
		return _answerId;
	}

	public void setAnswerId(int v) {
		_answerId = v;
	}

	@Override
	public String getRemark() {
		return _remark;
	}

	public void setRemark(String v) {
		_remark = v;
	}

}
