package als.api.servlets;


import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import als.model.ITask;
import als.model.impl.Task;
import als.persistence.dao.IPatientFormDAO;
import als.persistence.dao.IPatientSensorDAO;
import als.util.AppContextFactory;
import als.util.AppCtx;


/**
 * Handles requests for the Employee service.
 */
@RestController
public class TasksController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(TasksController.class);
         
    @RequestMapping(value = "/lastSubmittedTasks/{email}", method = RequestMethod.GET)
    public Collection<ITask> getLastSubmittedTasks(@PathVariable("email") String email) {
        
    	ApplicationContext ctx = AppContextFactory.getInstance().getContext(
				AppCtx.JDBC);
		IPatientSensorDAO sensorDAO = (IPatientSensorDAO) ctx.getBean("PatientSensorDAO");
		IPatientFormDAO formDAO = (IPatientFormDAO) ctx.getBean("PatientFormDAO");
		Collection<ITask> tests = new ArrayList<ITask>();
    	tests.addAll(formDAO.getLastSubmitedQuestionnaires(email));
    	tests.addAll(sensorDAO.getLastSubmitedQuestionnaires(email));
    	
        return tests;
    }
    
    @RequestMapping(value = "/lastSubmittedTasks/dummy/{email}", method = RequestMethod.GET)
    public Collection<ITask> getLastSubmittedTasksDummy(@PathVariable("email") String email) {
        System.out.println(email);
    	Collection<ITask> tests = new ArrayList<ITask>();
        tests.add(new Task("1" ,new Date() ));
        tests.add(new Task("2" ,new Date(System.currentTimeMillis()) ));
        tests.add(new Task("3" ,new Date(System.currentTimeMillis()) ));
        tests.add(new Task("4" ,new Date(System.currentTimeMillis()) ));
        return tests;
    }
     

     
}
