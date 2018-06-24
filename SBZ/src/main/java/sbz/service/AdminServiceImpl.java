package sbz.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sbz.domain.Bolest;
import sbz.domain.Korisnik;
import sbz.domain.Lek;
import sbz.domain.Pacijent;
import sbz.domain.Sastojak;
import sbz.domain.Simptom;
import sbz.exceptions.BadRequestException;
import sbz.repository.BolestRepository;
import sbz.repository.KorisnikRepository;
import sbz.repository.LekRepository;
import sbz.repository.PacijentRepository;
import sbz.repository.SastojakRepository;
import sbz.repository.SimptomRepository;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private LekarService lekarService;
	
	@Autowired
    private KorisnikRepository korisnikRepository;

	@Autowired
    private BolestRepository bolestRepository;
	
	@Autowired
    private LekRepository lekRepository;
	
	@Autowired
    private SastojakRepository sastojakRepository;
	
	@Autowired
    private SimptomRepository simptomRepository;
	
	@Autowired
    private PacijentRepository pacijentRepository;
	
	@Override
	public Korisnik registerLekar(Korisnik korisnik) {
		Korisnik k = this.korisnikRepository.findByUsername(korisnik.getUsername());

		if (k != null) {
			throw new BadRequestException("Korisnicko ime: " + korisnik.getUsername() + " je zauzeta!");
		}

		this.korisnikRepository.save(korisnik);

		return korisnik;
	}

	@Override
	public Pacijent registerPacijent(Pacijent p) {
		this.pacijentRepository.save(p);
		lekarService.insertSesije(p);
		return p;
	}
	
	@Override
	public Pacijent changePacijent(Pacijent p) {
		Pacijent p1 = this.pacijentRepository.findOne(p.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojeci pacijent!");
		}
		this.pacijentRepository.save(p);
		lekarService.updateSesije(p);
		return p;
	}

	@Override
	public void deletePacijent(Long id) {
		Pacijent p1 = this.pacijentRepository.findOne(id);
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojeci pacijent!");
		}
		try {	
			this.pacijentRepository.delete(p1);
		} catch (Exception e) {
			throw new BadRequestException("Nije moguce obrisati objekat sa kojim su povezani drugi objekti!");
		}
		lekarService.deleteSesije(p1);
	}

	@Override
	public Bolest addBolest(Bolest bolest) {
		try {	
			this.bolestRepository.save(bolest);
		} catch (Exception e) {
			throw new BadRequestException("Naziv mora da bude jednistven!");
		}
		lekarService.insertSesije(bolest);
		return bolest;
	}
	
	@Override
	public Bolest changeBolest(Bolest bolest) {
		Bolest p1 = this.bolestRepository.findOne(bolest.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojeca bolest!");
		}
		try {	
			this.bolestRepository.save(bolest);
		} catch (Exception e) {
			throw new BadRequestException("Naziv mora da bude jednistven!");
		}
		lekarService.updateSesije(bolest);
		return bolest;
	}

	@Override
	public void deleteBolest(Long id) {
		Bolest p1 = this.bolestRepository.findOne(id);
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojeca bolest!");
		}
		try {	
			this.bolestRepository.delete(p1);
		} catch (Exception e) {
			throw new BadRequestException("Nije moguce obrisati objekat sa kojim su povezani drugi objekti!");
		}
		lekarService.deleteSesije(p1);
	}
	
	@Override
	public Simptom addSimptom(Simptom simptom) {
		try {	
			this.simptomRepository.save(simptom);
		} catch (Exception e) {
			throw new BadRequestException("Naziv mora da bude jednistven!");
		}
		lekarService.insertSesije(simptom);
		return simptom;
	}
	
	@Override
	public Simptom changeSimptom(Simptom simptom) {
		Simptom p1 = this.simptomRepository.findOne(simptom.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojeci simptom!");
		}
		
		try {	
			this.simptomRepository.save(simptom);
		} catch (Exception e) {
			throw new BadRequestException("Naziv mora da bude jednistven!");
		}
		lekarService.updateSesije(simptom);
		return simptom;
	}

	@Override
	public void deleteSimptom(Long id) {
		Simptom p1 = this.simptomRepository.findOne(id);
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojeci simptom!");
		}
		try {	
			this.simptomRepository.delete(p1);
		} catch (Exception e) {
			throw new BadRequestException("Nije moguce obrisati objekat sa kojim su povezani drugi objekti!");
		}
		lekarService.deleteSesije(p1);
	}

	@Override
	public Lek addLek(Lek lek) {
		this.lekRepository.save(lek);

		return lek;
	}
	
	@Override
	public Lek changeLek(Lek lek) {
		Lek p1 = this.lekRepository.findOne(lek.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojeci lek!");
		}
		
		try {	
			this.lekRepository.save(lek);
		} catch (Exception e) {
			throw new BadRequestException("Naziv mora da bude jednistven!");
		}

		return lek;
	}

	@Override
	public void deleteLek(Long id) {
		Lek p1 = this.lekRepository.findOne(id);
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojecai lek!");
		}
		
		try {	
			this.lekRepository.delete(p1);
		} catch (Exception e) {
			throw new BadRequestException("Nije moguce obrisati objekat sa kojim su povezani drugi objekti!");
		}
	}

	@Override
	public Sastojak addSastojak(Sastojak sastojak) {
		try {	
			this.sastojakRepository.save(sastojak);
		} catch (Exception e) {
			throw new BadRequestException("Naziv mora da bude jednistven!");
		}

		return sastojak;
	}
	
	@Override
	public Sastojak changeSastojak(Sastojak sastojak) {
		Sastojak p1 = this.sastojakRepository.findOne(sastojak.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojecai lek!");
		}
		try {	
			this.sastojakRepository.save(sastojak);
		} catch (Exception e) {
			throw new BadRequestException("Naziv mora da bude jednistven!");
		}

		return sastojak;
	}

	@Override
	public void deleteSastojak(Long id) {
		Sastojak p1 = this.sastojakRepository.findOne(id);
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojecai lek!");
		}
		try {	
			this.sastojakRepository.delete(p1);
		} catch (Exception e) {
			throw new BadRequestException("Nije moguce obrisati objekat sa kojim su povezani drugi objekti!");
		}	

	}

	
}
