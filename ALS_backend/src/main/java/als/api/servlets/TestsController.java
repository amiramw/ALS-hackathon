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

import als.model.ITest;
import als.model.impl.Test;


/**
 * Handles requests for the Employee service.
 */
@RestController
public class TestsController {
     
         
    @RequestMapping(value = "/lastSubmittedTests/{email}", method = RequestMethod.GET)
    public Collection<ITest> getLastSubmittedTests(@PathVariable("email") String email) {
        
        return null;
    }
    
    @RequestMapping(value = "/lastSubmittedTests/dummy/{email}", method = RequestMethod.GET)
    public Collection<ITest> getLastSubmittedTestsDummy(@PathVariable("email") String email) {
        System.out.println(email);
    	Collection<ITest> tests = new ArrayList<ITest>();
        tests.add(new Test("1" ,new Date() ));
        tests.add(new Test("2" ,new Date(System.currentTimeMillis()) ));
        tests.add(new Test("3" ,new Date(System.currentTimeMillis()) ));
        tests.add(new Test("4" ,new Date(System.currentTimeMillis()) ));
        return tests;
    }
     

     
}
