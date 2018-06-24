package sbz.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
//@Inheritance(strategy=InheritanceType.JOINED)
public class Pacijent implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false)
	private String ime;
	
	@Column(nullable = false)
	private String prezime;
	
	@ManyToMany
	@JsonProperty(access = Access.WRITE_ONLY)
	private List<Dijagnoza> dijagnoze;
	
	@ManyToMany
	@JsonProperty(access = Access.WRITE_ONLY)
	private List<Lek> alergijeLek;
	
	@ManyToMany
	@JsonProperty(access = Access.WRITE_ONLY)
	private List<Sastojak> alergijeSastojci;

	public Pacijent() {}
	
	public Pacijent(Long id, String ime, String prezime, List<Dijagnoza> dijagnoze, List<Lek> alergijeLek,
			List<Sastojak> alergijeSastojci) {
		super();
		this.id = id;
		this.ime = ime;
		this.prezime = prezime;
		this.dijagnoze = dijagnoze;
		this.alergijeLek = alergijeLek;
		this.alergijeSastojci = alergijeSastojci;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public List<Dijagnoza> getDijagnoze() {
		return dijagnoze;
	}

	public void setDijagnoze(List<Dijagnoza> dijagnoze) {
		this.dijagnoze = dijagnoze;
	}

	public List<Lek> getAlergijeLek() {
		return alergijeLek;
	}

	public void setAlergijeLek(List<Lek> alergijeLek) {
		this.alergijeLek = alergijeLek;
	}

	public List<Sastojak> getAlergijeSastojci() {
		return alergijeSastojci;
	}

	public void setAlergijeSastojci(List<Sastojak> alergijeSastojci) {
		this.alergijeSastojci = alergijeSastojci;
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
		Pacijent other = (Pacijent) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	
}
