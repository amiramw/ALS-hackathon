package als.api.servlets;

import als.model.IPatient;
import als.persistence.dao.IPatientDAO;
import als.util.Gender;




import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Calendar;
	


import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;

import als.api.model.AnsweredQuestion;
import als.api.model.PatientProxy;
import als.api.model.Questionnaire;
import als.model.IAnsweredQuestion;
import als.model.impl.Answer;
import als.model.impl.FormQuestionnaire;
import als.model.impl.Patient;
import als.persistence.dao.IPatientFormDAO;
import als.util.AppContextFactory;
import als.util.AppCtx;
import als.util.QuestionnaireType;

import com.fasterxml.jackson.databind.ObjectMapper;


public class RegisterServlet extends HttpServlet 
{
	private static String userName;
	private static String email;
	private static int yearOfBirth;
	private static int numOfYearsSinceDiagnose;
	private static Gender gender;
	
	private static final Logger LOGGER = LoggerFactory
			.getLogger(RegisterServlet.class);
	
	
	@Override
	public void init() throws ServletException {
	}

	@Override
	public void destroy() {
	}
	
	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException
	{
		
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException
	{
		// 1. get received JSON data from request
		try (BufferedReader br = new BufferedReader(new InputStreamReader(
				request.getInputStream()))) {
			String json = "";
			if (br != null) {
				json = br.readLine();
			}

			// 2. initiate jackson mapper
			ObjectMapper mapper = new ObjectMapper();

			// 3. Convert received JSON to Article
			if (json == null) {
				// TODO throw something proper
				throw new RuntimeException("null json");
			}
			LOGGER.debug("newPatient is: " + json);
			PatientProxy patientProxy = mapper.readValue(json, PatientProxy.class);
			
			IPatient newPatient = new Patient(patientProxy.getEmail(), patientProxy.getFirstName(),
					patientProxy.getLastName(), new Date(), patientProxy.getGender(), patientProxy.getBirthday(), patientProxy.getDiagnoseDate());
			
			String offline = request.getParameter("offline");
			AppCtx appctx = offline!=null && Boolean.parseBoolean(offline)? AppCtx.OFFLINE : AppCtx.JDBC;
			ApplicationContext ctx = AppContextFactory.getInstance().getContext(appctx);
			IPatientDAO patientDAO = (IPatientDAO) ctx.getBean("PatientDAO");
			
			patientDAO.create(newPatient);
			
			
			
			response.setStatus(200);
		} catch (Exception e) {
			LOGGER.error("Exception occured: " + e);
			response.setStatus(500);
		}

	}
}

