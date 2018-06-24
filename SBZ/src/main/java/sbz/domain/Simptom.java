package sbz.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Simptom implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private String naziv;
	
	@Column(nullable = true)
	private double svalue;
	
	@Column(nullable = false)
	@Enumerated(EnumType.ORDINAL)
	protected SimptomType stype;

	public Simptom() {}
	

	public Simptom(Long id, String naziv, double svalue, SimptomType stype) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.svalue = svalue;
		this.stype = stype;
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getNaziv() {
		return naziv;
	}



	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}



	public double getSvalue() {
		return svalue;
	}



	public void setSvalue(double svalue) {
		this.svalue = svalue;
	}



	public SimptomType getStype() {
		return stype;
	}



	public void setStype(SimptomType stype) {
		this.stype = stype;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Simptom other = (Simptom) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	
}
