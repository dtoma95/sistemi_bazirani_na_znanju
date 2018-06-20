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
	private double value;
	
	@Column(nullable = false)
	@Enumerated(EnumType.ORDINAL)
	protected SimptomType type;

	public Simptom() {}
	
	public Simptom(Long id, String naziv, double value, SimptomType type) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.value = value;
		this.type = type;
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

	public double getValue() {
		return value;
	}

	public void setValue(double value) {
		this.value = value;
	}

	public SimptomType getType() {
		return type;
	}

	public void setType(SimptomType type) {
		this.type = type;
	}
	
	
	
}
