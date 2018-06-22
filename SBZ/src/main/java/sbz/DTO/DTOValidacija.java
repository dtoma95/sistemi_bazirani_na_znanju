package sbz.DTO;

import java.util.List;

import sbz.domain.Lek;
import sbz.domain.Sastojak;

public class DTOValidacija {
	private List<Lek> lekovi;
	private List<Sastojak> sastojci;
	
	public DTOValidacija() {}
	
	public List<Lek> getLekovi() {
		return lekovi;
	}
	public void setLekovi(List<Lek> lekovi) {
		this.lekovi = lekovi;
	}
	public List<Sastojak> getSastojci() {
		return sastojci;
	}
	public void setSastojci(List<Sastojak> sastojci) {
		this.sastojci = sastojci;
	}
	
	
}
