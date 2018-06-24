package sbz.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.rule.FactHandle;
import org.kie.api.runtime.rule.QueryResults;
import org.kie.api.runtime.rule.QueryResultsRow;
//import org.kie.api.runtime.KieContainer;
//import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sbz.domain.Bolest;
import sbz.domain.Dijagnoza;
import sbz.domain.Korisnik;
import sbz.domain.Lek;
import sbz.domain.Pacijent;
import sbz.domain.Sastojak;
import sbz.domain.Simptom;
import sbz.domain.SimptomType;
import sbz.domain.Uloga;
import sbz.exceptions.BadRequestException;
import sbz.repository.BolestRepository;
import sbz.repository.DijagnozaRepository;
import sbz.repository.KorisnikRepository;
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
	
	@Autowired
	private  KorisnikRepository korisnikRepository;
	
	@Autowired
	private  DijagnozaRepository dijagnozaRepository;
	
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
		
		kieSession.delete(kieSession.getFactHandle(d));
		
		return d.getBolest();
	}
	
	@Override
	public Dijagnoza addDijagnoza(Dijagnoza d, long pacijentId) {
		Korisnik k = korisnikRepository.findByUsername(d.getLekar().getUsername());
		if (k == null || !(k.getUloga().equals(Uloga.LEKAR))) {
			throw new BadRequestException("Nepostojeci lekar!");
		}
		d.setLekar(k);
		Pacijent p = pacijentRepository.findOne(pacijentId);
		if (p == null) {
			throw new BadRequestException("Nepostojeci pacijent!");
		}
		d.setPacijent(p);
		d.setDatum(new Date());
		
		this.dijagnozaRepository.save(d);
		
		p.getDijagnoze().add(d);
		this.pacijentRepository.save(p);
		
		return d;
	}

	@Override
	public Dijagnoza changeDijagnoza(Dijagnoza d) {
		return null;
	}

	@Override
	public void deleteDijagnoza(Dijagnoza d) {
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
		
		kieSession.delete(kieSession.getFactHandle(d));
		
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
		
		kieSession.delete(kieSession.getFactHandle(d));
		
		return (List<Sastojak>) kieSession.getGlobal("retSastojak");
	}

	public HashMap<String, KieSession> getSesije() {
		return sesije;
	}

	public void setSesije(HashMap<String, KieSession> sesije) {
		this.sesije = sesije;
	}

	@Override
	public List<Bolest> uptiBolesti(Dijagnoza d) {
		KieSession kieSession = sesije.get(d.getLekar().getUsername());
		
		
		QueryResults results = kieSession.getQueryResults( "upit nadji bolesti", d );
		
		ArrayList<Bolest> retval = new ArrayList<Bolest>();
		ArrayList<Integer> vals = new ArrayList<Integer>();
		for ( QueryResultsRow row : results ) {
		    Bolest b = ( Bolest ) row.get( "$b" );
		    Integer br = ( Integer ) row.get( "$val" );
		    int i = 0;
		    for (i = 0; i<vals.size(); i++) {
				if(vals.get(i) < br) {
					break;
				}
			}
		    vals.add(i, br);
		    retval.add(i, b);
		}
		return retval;
	}

	@Override
	public List<Simptom> uptiSimptomi(Dijagnoza d) {
		KieSession kieSession = sesije.get(d.getLekar().getUsername());
		
		Bolest b = this.bolestRepository.findOne(d.getBolest().getId());
		
		ArrayList<Simptom> retval = new ArrayList<Simptom>();
		
		QueryResults results = kieSession.getQueryResults( "upit nadji simptome specificni", b );
		for ( QueryResultsRow row : results ) {
			Simptom s = ( Simptom ) row.get( "$s" );
		    retval.add(s);
		}
		
		results = kieSession.getQueryResults( "upit nadji simptome opsti", b );
		for ( QueryResultsRow row : results ) {
			Simptom s = ( Simptom ) row.get( "$s" );
		    retval.add(s);
		}
		return retval;
	}

	@Override
	public void updateSesije(Object o) {
		for (String s : sesije.keySet()) {
			KieSession kieSession = sesije.get(s);
			FactHandle fh = this.getFactHandle(kieSession, o);
			if(fh != null)
				kieSession.update(fh, o);
		}
	}

	@Override
	public void insertSesije(Object o) {
		for (String s : sesije.keySet()) {
			KieSession kieSession = sesije.get(s);
			kieSession.insert(o);
		}
	}

	@Override
	public void deleteSesije(Object o) {
		for (String s : sesije.keySet()) { 
			KieSession kieSession = sesije.get(s);
			FactHandle fh = this.getFactHandle(kieSession, o);
			if(fh != null)
				kieSession.delete(fh);
		}
	}
	
	private FactHandle getFactHandle(KieSession ks, Object o) {
		for (Object obj : ks.getObjects()) {
			if(obj.equals(o))
				return ks.getFactHandle(obj);
		}
		return null;
	}
}
