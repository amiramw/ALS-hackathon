package als.util;

/**
 * @author I031820
 *
 */

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class AppContextFactory {
	
	private static AppContextFactory sInstance = new AppContextFactory();
	private ApplicationContext mJDBCApplicationContext = null;
	private ApplicationContext mOfflineApplicationContext = null;
	
	private AppContextFactory(){
		mJDBCApplicationContext = new ClassPathXmlApplicationContext("/application-context.xml");
		mOfflineApplicationContext= new ClassPathXmlApplicationContext("/application-offline-context.xml");
	}
	
	public static synchronized AppContextFactory getInstance(){
		if(sInstance==null)
			sInstance = new AppContextFactory();
		return sInstance;
	}
	
	public ApplicationContext getContext(AppCtx ctx){
		if(AppCtx.JDBC.equals(ctx)){
			return mJDBCApplicationContext;
		}
		
		return mOfflineApplicationContext;
	}

}
