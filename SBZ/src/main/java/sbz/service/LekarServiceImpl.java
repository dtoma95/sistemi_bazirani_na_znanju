package sbz.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
//import org.kie.api.runtime.KieContainer;
//import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sbz.domain.Bolest;
import sbz.domain.Dijagnoza;
import sbz.domain.Lek;
import sbz.domain.Pacijent;
import sbz.domain.Sastojak;
import sbz.domain.Simptom;
import sbz.domain.SimptomType;
import sbz.exceptions.BadRequestException;
import sbz.repository.BolestRepository;
import sbz.repository.PacijentRepository;
import sbz.repository.SimptomRepository;

@Service
public class LekarServiceImpl implements LekarService {
	private HashMap<String, KieSession> sesije = new HashMap<String, KieSession>();
	
	@Autowired
	private  KieContainer kieContainer;
	
	@Autowired
	private  BolestRepository bolestRepository;
	
	@Autowired
	private  SimptomRepository simptomRepository;
	
	@Autowired
	private  PacijentRepository pacijentRepository;
	
	@Override
	public Bolest dijagnozaBolesti(Dijagnoza d, long pacijentId, String grupa) {
		KieSession kieSession = sesije.get(d.getLekar().getUsername());

		Pacijent p = pacijentRepository.findOne(pacijentId);
		if (p == null) {
			throw new BadRequestException("Nepostojeci pacijent!");
		}
		
		d.setPacijent(p);
		kieSession.insert(d);
		
		kieSession.getAgenda().getAgendaGroup(grupa).setFocus();
		System.out.println(kieSession.fireAllRules());
		if(d.getBolest() != null)
			System.out.println(d.getBolest().getOpis());
		else
			System.out.println("null");
		
		
		//kieSession.(kieSession.getFactHandle(d.getSimptomi()));
		return d.getBolest();
	}
	
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
		Bolest b = new Bolest();
		b.setOpis("Prehlada");
		b.setSimptomi(new ArrayList<Simptom>());
		
		Simptom s = new Simptom(1L, "Kasalj", 0,  SimptomType.NORMAL);
		b.getSimptomi().add(s);
		
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Pacijent> izvestaj(String grupa, String username) { //izvestajHronicnaOboljenja
		KieSession kieSession = sesije.get(username);
		
		kieSession.setGlobal( "retPacijenti", new ArrayList<Pacijent>());
		kieSession.getAgenda().getAgendaGroup(grupa).setFocus();
		System.out.println(kieSession.fireAllRules());
		
		//kieSession.(kieSession.getFactHandle(d.getSimptomi()));
		return (List<Pacijent>) kieSession.getGlobal( "retPacijenti");
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Lek> validacijaLeka(Dijagnoza d, long pacijentId) {
		KieSession kieSession = sesije.get(d.getLekar().getUsername());
		
		Pacijent p = pacijentRepository.findOne(pacijentId);
		if (p == null) {
			throw new BadRequestException("Nepostojeci pacijent!");
		}
		
		d.setPacijent(p);
		kieSession.insert(d);
		
		
		kieSession.setGlobal( "retLek", new ArrayList<Lek>());
		kieSession.getAgenda().getAgendaGroup("alergijaLek").setFocus();
		System.out.println(kieSession.fireAllRules());
		
		//kieSession.(kieSession.getFactHandle(d.getSimptomi()));
		return (List<Lek>) kieSession.getGlobal( "retLek");
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Sastojak> validacijaSastojaka(Dijagnoza d, long pacijentId) {
		KieSession kieSession = sesije.get(d.getLekar().getUsername());
		
		Pacijent p = pacijentRepository.findOne(pacijentId);
		if (p == null) {
			throw new BadRequestException("Nepostojeci pacijent!");
		}
		
		d.setPacijent(p);
		kieSession.insert(d);
		
		
		kieSession.setGlobal( "retSastojak", new ArrayList<Sastojak>());
		kieSession.getAgenda().getAgendaGroup("alergijaSastojak").setFocus();
		System.out.println(kieSession.fireAllRules());
		
		//kieSession.(kieSession.getFactHandle(d.getSimptomi()));
		return (List<Sastojak>) kieSession.getGlobal("retSastojak");
	}

	public HashMap<String, KieSession> getSesije() {
		return sesije;
	}

	public void setSesije(HashMap<String, KieSession> sesije) {
		this.sesije = sesije;
	}
	
	@Override
	public void test() {
		KieSession kieSession = kieContainer.newKieSession();
		List<Bolest> bolesti = (List<Bolest>) bolestRepository.findAll();
		for (Bolest b : bolesti) {
			System.out.println("Adding - " + b.getOpis());
			kieSession.insert(b);
		}
		
		List<Simptom> simptomi = (List<Simptom>) simptomRepository.findAll();
		for (Simptom s : simptomi) {
			kieSession.insert(s);
		}
		
		Dijagnoza d = new Dijagnoza();
		d.setSimptomi(new ArrayList<Simptom>());
		
		Simptom s1 = new Simptom(100L, "Curenje iz nosa", 0,  SimptomType.NORMAL);
		d.getSimptomi().add(s1);
		s1 = new Simptom(101L, "Bol u grlu", 0,  SimptomType.NORMAL);
		d.getSimptomi().add(s1);
		s1 = new Simptom(102L, "Glavobolja", 0,  SimptomType.NORMAL);
		d.getSimptomi().add(s1);
		s1 = new Simptom(103L, "Kijanje", 0,  SimptomType.NORMAL);
		d.getSimptomi().add(s1);
		s1 = new Simptom(104L, "Kasalj", 0,  SimptomType.NORMAL);
		d.getSimptomi().add(s1);
		s1 = new Simptom(104L, "Temperatura", 39,  SimptomType.NUMERIC);
		d.getSimptomi().add(s1);
		
		Pacijent p = new Pacijent();
		p.setDijagnoze(new ArrayList<Dijagnoza>());
		Dijagnoza d1 = new Dijagnoza();
		Bolest b = new Bolest();
		b.setOpis("Groznica");
		d1.setBolest(b);
		
		d1.setSimptomi(new ArrayList<Simptom>());
		Simptom s3 = new Simptom(100L, "Visok pritisak", 0,  SimptomType.NORMAL);
		d1.getSimptomi().add(s3);
		d1.setDatum(new Date());
		p.getDijagnoze().add(d1);
		p.getDijagnoze().add(d1);
		p.getDijagnoze().add(d1);
		
		d.setPacijent(p);
		kieSession.insert(d);
		
		kieSession.getAgenda().getAgendaGroup("bolesti").setFocus();
		System.out.println(kieSession.fireAllRules());
		if(d.getBolest() != null)
			System.out.println(d.getBolest().getOpis());
		else
			System.out.println("null");
	}
}
