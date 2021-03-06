package sbz.service;

import java.util.HashMap;
import java.util.List;

import org.kie.api.runtime.KieSession;

import sbz.domain.Bolest;
import sbz.domain.Dijagnoza;
import sbz.domain.Pacijent;
import sbz.domain.Lek;
import sbz.domain.Sastojak;
import sbz.domain.Simptom;

public interface LekarService {
	public HashMap<String, KieSession> getSesije();

	public void setSesije(HashMap<String, KieSession> sesije);
	
	List<Bolest> uptiBolesti(Dijagnoza d);
	List<Simptom> uptiSimptomi(Dijagnoza d);
	
	Dijagnoza addDijagnoza(Dijagnoza d, long pacijentId);
	Dijagnoza changeDijagnoza(Dijagnoza d);
	void deleteDijagnoza(Dijagnoza d);
	
	Bolest dijagnozaBolesti(Dijagnoza d, long pacijentId, String grupa);
	
	List<Pacijent> izvestaj(String grupa, String usernam);
	
	List<Lek> validacijaLeka(Dijagnoza d, long pacijentId);
	List<Sastojak> validacijaSastojaka(Dijagnoza d, long pacijentId);
	
	void updateSesije(Object o);
	void insertSesije(Object o);
	void deleteSesije(Object o);
}
