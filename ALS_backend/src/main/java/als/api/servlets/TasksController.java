package als.api.servlets;


import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
 








import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
 
import org.springframework.web.bind.annotation.RestController;

import als.model.ITask;
import als.model.impl.Task;


/**
 * Handles requests for the Employee service.
 */
@RestController
public class TasksController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(TasksController.class);
         
    @RequestMapping(value = "/lastSubmittedTasks/{email}", method = RequestMethod.GET)
    public Collection<ITask> getLastSubmittedTasks(@PathVariable("email") String email) {
        
        return null;
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
