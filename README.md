SAP-ALS-hackthon
================

ALS patience medical questioner made easy

Backend Development Environment Setup
----

The backend code is under ALS_backend.
Please do not push backend code to repository without running maven successfully in your environment.

### Maven

*   Download Maven 3.0.5 from the [Apache Maven Website](http://maven.apache.org/download.cgi).
*   (For ease of use, add it to PATH)
*   Add settings.xml into ~/.m2 (copy the file from somebody)
*	To run maven (in the git shell):
	*	CD to ...\rdl_compiler (repository root)
	*	Execute mvn clean install


### Local Tomcat

* Install tomcat version 7.0 from apache website.
* Add the following tag under context.xml (the master is under <Tomcat folder>/conf/context.xml but if you run in eclipse you should be able to override it in the eclipse server folder):
```xml
   	<Resource name="jdbc/DefaultDB" auth="Container"
          type="javax.sql.DataSource" driverClassName="org.apache.derby.jdbc.EmbeddedDriver"
          url="jdbc:derby:memory:DemoDB;create=true"
          username="demo" password="demo" maxActive="20" maxIdle="10" maxWait="-1"/>
```
This means that your server will run with in-memory DB.

### Eclipse

* Install eclipse luna JEE
* Install plugin Maven - http://download.eclipse.org/technology/m2e/releases
* The backend project is ALS_backend
* To run: right click on the project -> Run As -> Run on Server. Then define new Tomcat that is linked to your Tomcat 7.0 installation.
* The following request should works: GET http://localhost:8080/ALS_backend/als.svc

### Tips

* Push command:

        git push origin master

