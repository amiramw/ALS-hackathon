package als.api.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;

import als.api.model.AnsweredQuestion;
import als.api.model.Questionnaire;
import als.model.IAnsweredQuestion;
import als.model.impl.Answer;
import als.model.impl.FormQuestionnaire;
import als.persistence.dao.IPatientFormDAO;
import als.util.AppContextFactory;
import als.util.AppCtx;
import als.util.HTTPUtil;
import als.util.QuestionnaireType;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementing questionnaire get and post
 */
public class QuestionnaireServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger LOGGER = LoggerFactory.getLogger(QuestionnaireServlet.class);

	@Override
	public void init() throws ServletException {
	}

	@Override
	public void destroy() {
	}

	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// 1. get received JSON data from request
		
		try (BufferedReader br = new BufferedReader(new InputStreamReader(
				request.getInputStream()))) {
			String json = HTTPUtil.bodyToString(br);

			// 2. initiate jackson mapper
			ObjectMapper mapper = new ObjectMapper();

			// 3. Convert received JSON to Article
			if (json == null) {
				// TODO throw something proper
				throw new RuntimeException("null json");
			}
			LOGGER.debug("filledQuestionnaire is: " + json);
			Questionnaire filledQuestions = mapper.readValue(json,
					Questionnaire.class);
			
			ApplicationContext ctx = AppContextFactory.getInstance().getContext(AppCtx.JDBC);
			IPatientFormDAO patientFormDAO = (IPatientFormDAO) ctx.getBean("PatientFormDAO");
			QuestionnaireType questType = QuestionnaireType.FORM;
			Map<Integer, IAnsweredQuestion> answers = new HashMap<>();
			for (AnsweredQuestion q : filledQuestions.getAnswers()) {
				answers.put(q.getQuestionId(), new Answer(q.getAnswer(), q.getRemark()));
			}
			
			FormQuestionnaire daoQuestionnaire = new FormQuestionnaire(filledQuestions.getEmail(), new Date(), questType, answers);
			patientFormDAO.create(daoQuestionnaire);

			// TODO call persistency layer
			response.setStatus(200);
		} catch (Exception e) {
			LOGGER.error("Exception occured on questionnaire flow", e);
			response.setStatus(500);
		}
	}

}