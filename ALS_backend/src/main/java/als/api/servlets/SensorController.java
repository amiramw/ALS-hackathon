package als.api.servlets;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import als.api.model.SensorProxy;



@RestController
public class SensorController {

	@RequestMapping(value = "/sensor/dummy", method = RequestMethod.POST)
	public String submitSensor(@ModelAttribute("sensorUploadForm") SensorProxy sensorProxy){
		MultipartFile data = sensorProxy.getData();
		
		String fileName = data.getOriginalFilename();
		System.out.println(fileName);
		try {
			InputStream input = data.getInputStream();
		} catch (IOException e) {
			
			e.printStackTrace();
		}
		return "Sensor data accepted";
	}
}
