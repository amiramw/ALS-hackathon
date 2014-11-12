package als.api.servlets;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import als.api.model.SensorProxy;
import als.model.IAnsweredQuestion;
import als.model.impl.Answer;
import als.model.impl.SensorQuestionnaire;
import als.persistence.dao.IPatientSensorDAO;
import als.util.AppContextFactory;
import als.util.AppCtx;
import als.util.QuestionnaireType;


@RestController
public class SensorController {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(SensorController.class);

	@RequestMapping(value = "/sensor/dummy", method = RequestMethod.POST)
	public String submitSensorDummy(
			@ModelAttribute("sensorUploadForm") SensorProxy sensorProxy) {
		MultipartFile data = sensorProxy.getData();

		
		return "Sensor data accepted";
	}

	@RequestMapping(value = "/sensor", method = RequestMethod.POST)
	public String submitSensor(
			@ModelAttribute("sensorUploadForm") SensorProxy sensorProxy)
			throws IOException {

		MultipartFile data = sensorProxy.getData();
		byte[] fileByte = data.getBytes();

		ApplicationContext ctx = AppContextFactory.getInstance().getContext(
				AppCtx.JDBC);
		IPatientSensorDAO formDAO = (IPatientSensorDAO) ctx
				.getBean("PatientSensorDAO");

		IAnsweredQuestion answer = new Answer(fileByte,
				data.getOriginalFilename());
		Map<Integer, IAnsweredQuestion> answers = new HashMap<Integer, IAnsweredQuestion>();
		answers.put(0, answer);

		SensorQuestionnaire questionnaire = new SensorQuestionnaire(
				sensorProxy.getEmail(), new Date(), QuestionnaireType.SENSOR,
				answers, sensorProxy.getSensor());

		formDAO.create(questionnaire);
		return "Sensor data accepted";
	}

	
	@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "No data was submitted")
	@ExceptionHandler(NullPointerException.class)
	public void handleNullPointerException(HttpServletRequest req, Exception exception) {
		LOGGER.error("Request: " + req.getRequestURL() + " raised  "
				+ exception);
		
	}
	
	@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "No data was submitted")
	@ExceptionHandler(IOException.class)
	public void handleIOException(HttpServletRequest req, Exception exception) {
		LOGGER.error("Request: " + req.getRequestURL() + " raised  "
				+ exception);
		
	}

}
