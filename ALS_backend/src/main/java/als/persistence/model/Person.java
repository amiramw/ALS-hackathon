package als.persistence.model;

import static javax.persistence.TemporalType.DATE;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQuery;
import javax.persistence.Temporal;
import javax.persistence.NamedQueries;

@Entity
@NamedQueries({
	@NamedQuery(name = "AllPersons", query = "select p from Person as p"),
	@NamedQuery(name = "PersonByID", query = "select p from Person p where p.id = :loginId") 
})
public class Person implements Serializable {

	private static final long serialVersionUID = 1L;

	public Person() {
	}

	private String firstName;
	private String lastName;
	@Temporal(DATE)
	private Date dateOfBirth;
	private String phoneNumber;
	@ManyToMany
	@JoinTable(name = "Person2Car")
	private Collection<Car> cars;
	@GeneratedValue
	@Id
	private String id;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String param) {
		this.firstName = param;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String param) {
		this.lastName = param;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date param) {
		this.dateOfBirth = param;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String param) {
		this.phoneNumber = param;
	}

	public Collection<Car> getCars() {
		return cars;
	}

	public void setCars(Collection<Car> param) {
		this.cars = param;
	}

	public String getId() {
		return id;
	}

	public void setId(String param) {
		this.id = param;
	}

}