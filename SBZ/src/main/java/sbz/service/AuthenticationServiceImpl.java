package sbz.service;

import java.util.List;

import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sbz.domain.Bolest;
import sbz.domain.Korisnik;
import sbz.domain.Pacijent;
import sbz.domain.Simptom;
import sbz.domain.Uloga;
import sbz.exceptions.BadRequestException;
import sbz.repository.BolestRepository;
import sbz.repository.KorisnikRepository;
import sbz.repository.PacijentRepository;
import sbz.repository.SimptomRepository;


@Service
public class AuthenticationServiceImpl implements AuthenticationService {

	@Autowired
	private  KieContainer kieContainer;
	
	@Autowired
	private LekarService lekarService;
	
	@Autowired
    private KorisnikRepository korisnikRepository;
	
	@Autowired
	private  BolestRepository bolestRepository;
	
	@Autowired
	private  SimptomRepository simptomRepository;
	
	@Autowired
	private  PacijentRepository pacijentRepository;
    
    @Override
    public Korisnik ulogujKorisnika(Korisnik logovanje) {

        Korisnik korisnik = this.korisnikRepository.findByUsername(logovanje.getUsername());

        if (korisnik == null || !(korisnik.getLozinka().equals(logovanje.getLozinka()))) {
        	throw new BadRequestException("Invalid Login!");
        }
        if(korisnik.getUloga().equals(Uloga.LEKAR)) {
        	KieSession kieSession = kieContainer.newKieSession();
        	List<Bolest> bolesti = (List<Bolest>) bolestRepository.findAll();
    		for (Bolest b : bolesti) {
    			System.out.println("Adding - " + b.getOpis());
    			b.getSimptomi().size();
    			b.getSpecificniSimptomi().size();
    			kieSession.insert(b);
    		}
    		List<Simptom> simptomi = (List<Simptom>) simptomRepository.findAll();
    		for (Simptom s : simptomi) {
    			kieSession.insert(s);
    		}
    		List<Pacijent> pacijenti = (List<Pacijent>) pacijentRepository.findAll();
    		for (Pacijent p : pacijenti) {
    			p.getDijagnoze().size();
    			kieSession.insert(p);
    		}
    		
    		lekarService.getSesije().put(korisnik.getUsername(), kieSession);
        }
        
        
        return korisnik;
    }

	@Override
	public boolean izlogujKorisnika(Korisnik logovanje) {

		Korisnik korisnik = this.korisnikRepository.findByUsername(logovanje.getUsername());
		 if(korisnik.getUloga().equals(Uloga.LEKAR)) {
			 KieSession ks = lekarService.getSesije().get(korisnik.getUsername());
			 ks.dispose();
			 lekarService.getSesije().remove(korisnik.getUsername());
	     }
		 return true;
	}
	
}
