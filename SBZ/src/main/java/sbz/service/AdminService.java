package sbz.service;

import sbz.domain.Bolest;
import sbz.domain.Korisnik;
import sbz.domain.Lek;
import sbz.domain.Pacijent;
import sbz.domain.Sastojak;
import sbz.domain.Simptom;

public interface AdminService {
	
	Korisnik registerLekar(Korisnik k);
	Korisnik changeLekar(Korisnik k);
	void deleteLekar(Korisnik k);
	
	Pacijent registerPacijent(Pacijent p);
	Pacijent changePacijent(Pacijent p);
	void deletePacijent(Pacijent p);
	
	Bolest addBolest(Bolest bolest);
	Bolest changeBolest(Bolest bolest);
	void deleteBolest(Bolest bolest);
	
	Simptom addSimptom(Simptom simptom);
	Simptom changeSimptom(Simptom simptom);
	void deleteSimptom(Simptom simptom);
	
	Lek addLek(Lek lek);
	Lek changeLek(Lek lek);
	void deleteLek(Lek lek);
	
	Sastojak addSastojak(Sastojak sastojak);
	Sastojak changeSastojak(Sastojak sastojak);
	void deleteSastojak(Sastojak sastojak);
	
}
