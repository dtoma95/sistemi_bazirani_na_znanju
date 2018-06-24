package sbz.service;

import sbz.domain.Bolest;
import sbz.domain.Korisnik;
import sbz.domain.Lek;
import sbz.domain.Pacijent;
import sbz.domain.Sastojak;
import sbz.domain.Simptom;

public interface AdminService {
	
	Korisnik registerLekar(Korisnik k);
	
	Pacijent registerPacijent(Pacijent p);
	Pacijent changePacijent(Pacijent p);
	void deletePacijent(Long p);
	
	Bolest addBolest(Bolest bolest);
	Bolest changeBolest(Bolest bolest);
	void deleteBolest(Long bolest);
	
	Simptom addSimptom(Simptom simptom);
	Simptom changeSimptom(Simptom simptom);
	void deleteSimptom(Long simptom);
	
	Lek addLek(Lek lek);
	Lek changeLek(Lek lek);
	void deleteLek(Long lek);
	
	Sastojak addSastojak(Sastojak sastojak);
	Sastojak changeSastojak(Sastojak sastojak);
	void deleteSastojak(Long sastojak);
	
}
