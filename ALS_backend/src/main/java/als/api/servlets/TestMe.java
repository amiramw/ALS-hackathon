package als.api.servlets;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;

import als.model.IPatient;
import als.model.impl.Patient;
import als.persistence.dao.IPatientDAO;
import als.util.AppContextFactory;
import als.util.AppCtx;
import als.util.Gender;

/**
 * Servlet implementation class Welcome
 */
@WebServlet("/Welcome")
public class TestMe extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static int index = 0;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TestMe() {
        super();
        
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 //ApplicationContext applicationContext = new ClassPathXmlApplicationContext("/application-context.xml");
		//@RequestParam(value = "offline") Boolean val;
		String offline = request.getParameter("offline");
		AppCtx appctx = offline!=null && Boolean.parseBoolean(offline)? AppCtx.OFFLINE : AppCtx.JDBC;
		ApplicationContext ctx = AppContextFactory.getInstance().getContext(appctx);
		IPatientDAO patientDAO = (IPatientDAO) ctx.getBean("PatientDAO");
		if(patientDAO!=null){
			String key = "safdfa" + index++;
			patientDAO.create(new Patient(key,"aaa","fdfd",new Date(System.currentTimeMillis()),Gender.MALE,new Date(2011,4,6),new Date(1900,2,2)));
			IPatient p = patientDAO.getPatient(key);
			response.getOutputStream().println(p==null ? "Could not find p":"Success");
		} else {
			response.getOutputStream().println("Failed");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
