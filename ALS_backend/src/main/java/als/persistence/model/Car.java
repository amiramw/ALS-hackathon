package als.persistence.model;

import java.io.Serializable;

import javax.persistence.*;

import als.persistence.model.Person;

import java.util.Collection;

@Entity
public class Car implements Serializable {

	private static final long serialVersionUID = 1L;

	public Car() {
	}

	@Id
	private long licensePlate;
	@ManyToMany(mappedBy = "cars")
	private Collection<Person> owners;

	public long getLicensePlate() {
		return licensePlate;
	}

	public void setLicensePlate(long id) {
		this.licensePlate = id;
	}

	public Collection<Person> getOwners() {
	    return owners;
	}

	public void setOwners(Collection<Person> param) {
	    this.owners = param;
	}

}