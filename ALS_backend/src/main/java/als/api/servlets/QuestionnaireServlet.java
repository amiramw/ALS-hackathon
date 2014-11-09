package als.api.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import als.api.model.Questionnaire;

//import als.model.impl.AnsweredQuestionnaire;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementing questionnaire get and post
 */
public class QuestionnaireServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger LOGGER = LoggerFactory
			.getLogger(QuestionnaireServlet.class);


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
			LOGGER.debug("filledQuestionnaire is: " + json);
			Questionnaire filledQuestions = mapper.readValue(json,
					Questionnaire.class);
			// TODO call persistency layer
			response.setStatus(200);
		} catch (Exception e) {
			LOGGER.error("Exception occured: " + e);
			response.setStatus(500);
		}
	}

}