package sbz.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

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
	private List<Dijagnoza> dijagnoze;
	
	@ManyToMany
	private List<Lek> alergijeLek;
	
	@ManyToMany
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
	
	
}