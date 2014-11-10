package als.model.impl;

/**
 * @author I031820
 *
 */

import java.util.Date;
import java.util.Map;

import als.model.IAnsweredQuestion;
import als.util.QuestionnaireType;
import als.util.Sensor;

public class SensorQuestionnaire extends AbstractQuestionnaire{

	private Sensor mSensorType = null;
	public SensorQuestionnaire(String mail, Date date, QuestionnaireType type,
			Map<Integer, IAnsweredQuestion> answers,Sensor sensor) {
		super(mail, date, QuestionnaireType.SENSOR, answers);
		this.mSensorType = sensor;
	}

	public Sensor getSensorType(){
		return this.mSensorType;
	}

}
