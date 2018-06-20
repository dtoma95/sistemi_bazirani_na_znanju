package sbz.service;

import java.util.List;

import sbz.domain.Dijagnoza;
import sbz.domain.Pacijent;

public interface LekarService {

	Dijagnoza addDijagnoza(Dijagnoza d);
	Dijagnoza changeDijagnoza(Dijagnoza d);
	void deleteDijagnoza(Dijagnoza d);
	
	List<Pacijent> izvestajHronicnaOboljenja();
	List<Pacijent> izvestajZavisnici();
	List<Pacijent> izvestajImunitet();
}
