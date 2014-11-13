package als.util;

import java.io.BufferedReader;
import java.io.IOException;

public class HTTPUtil {
	public static String bodyToString(BufferedReader br) throws IOException {
		StringBuilder jsonSB = new StringBuilder();
		int b;
		while ((b = br.read()) != -1) {
			jsonSB.append((char) b);
		}
		String json = jsonSB.toString();
		return json;
	}


}
