package sbz.service;

import java.util.List;

import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
//import org.kie.api.runtime.KieContainer;
//import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sbz.domain.Dijagnoza;
import sbz.domain.Pacijent;
import sbz.domain.Simptom;
import sbz.domain.SimptomType;

@Service
public class LekarServiceImpl implements LekarService {

	@Autowired
	private  KieContainer kieContainer;
	
	@Override
	public Dijagnoza addDijagnoza(Dijagnoza d) {
		
		return d;
	}

	@Override
	public Dijagnoza changeDijagnoza(Dijagnoza d) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteDijagnoza(Dijagnoza d) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Pacijent> izvestajHronicnaOboljenja() {
		KieSession kieSession = kieContainer.newKieSession();
		Simptom s = new Simptom(1L, "boli glava :(", 0,  SimptomType.NORMAL);
		System.out.println(s.getValue());
		
		kieSession.insert(s);
		System.out.println(kieSession.fireAllRules());
		
		System.out.println(s.getValue());
		
		return null;
	}

	@Override
	public List<Pacijent> izvestajZavisnici() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Pacijent> izvestajImunitet() {
		// TODO Auto-generated method stub
		return null;
	}

}
