package sbz.service;

import java.util.List;

import sbz.domain.Bolest;
import sbz.domain.Dijagnoza;
import sbz.domain.Lek;
import sbz.domain.Pacijent;
import sbz.domain.Simptom;

public interface GettersService {
	List<Pacijent> getPacijenti();
	Pacijent getPacijent(long pacijentId);
	
	List<Bolest> getBolesti();
	List<Simptom> getSimptomi();
	List<Lek> getLekovi();
	List<Dijagnoza> getKarton(long pacijentId);
	
	
}
