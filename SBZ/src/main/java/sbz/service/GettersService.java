package sbz.service;

import java.util.List;

import sbz.domain.Bolest;
import sbz.domain.Dijagnoza;
import sbz.domain.Korisnik;
import sbz.domain.Lek;
import sbz.domain.Pacijent;
import sbz.domain.Sastojak;
import sbz.domain.Simptom;

public interface GettersService {
	List<Pacijent> getPacijenti();
	Pacijent getPacijent(long pacijentId);
	
	List<Bolest> getBolesti();
	Bolest getBolest(long id);
	
	List<Simptom> getSimptomi();
	Simptom getSimptom(long id);
	
	List<Lek> getLekovi();
	Lek getLek(long id);
	
	List<Sastojak> getSastojci();
	Sastojak getSastojak(long id);

	List<Korisnik> getKorisnici();
	Korisnik getKorisnik(long id);
	
	List<Dijagnoza> getKarton(long pacijentId);
}
