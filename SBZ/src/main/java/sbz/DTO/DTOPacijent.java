package sbz.DTO;

import java.util.List;

import sbz.domain.Lek;
import sbz.domain.Pacijent;
import sbz.domain.Sastojak;

public class DTOPacijent {

	private Long id;
	private String ime;
	private String prezime;
	private List<Lek> alergijeLek;
	private List<Sastojak> alergijeSastojci;

	public DTOPacijent() {}
	
	public DTOPacijent(Pacijent p) {
		id = p.getId();
		ime = p.getIme();
		prezime = p.getPrezime();
		alergijeLek = p.getAlergijeLek();
		alergijeSastojci = p.getAlergijeSastojci();
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
