package als.persistence.dao.jdbc;

/**
 * @author I031820
 *
 */

import org.springframework.jdbc.core.JdbcTemplate;

class BaseCon {
	
	protected JdbcTemplate jdbcTemplateObject;


	public void setConnection(Object conn) {
		if(!(conn instanceof JdbcTemplate))throw new IllegalArgumentException("Wrong input connection type");
		this.jdbcTemplateObject = (JdbcTemplate)conn;		
	}

}
