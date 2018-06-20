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
	public Korisnik changeLekar(Korisnik k) {
		Korisnik k1 = this.korisnikRepository.findByUsername(k.getUsername());

		if (k1 == null) {
			throw new BadRequestException("Nepostojeci korisnik!");
		}

		this.korisnikRepository.save(k);

		return k;
	}

	@Override
	public void deleteLekar(Korisnik k) {
		Korisnik k1 = this.korisnikRepository.findByUsername(k.getUsername());

		if (k1 == null) {
			throw new BadRequestException("Nepostojeci korisnik!");
		}

		this.korisnikRepository.delete(k);
		
	}

	@Override
	public Pacijent registerPacijent(Pacijent p) {
		this.pacijentRepository.save(p);

		return p;
	}
	
	@Override
	public Pacijent changePacijent(Pacijent p) {
		Pacijent p1 = this.pacijentRepository.findOne(p.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojeci pacijent!");
		}
		this.pacijentRepository.save(p);

		return p;
	}

	@Override
	public void deletePacijent(Pacijent p) {
		Pacijent p1 = this.pacijentRepository.findOne(p.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojeci pacijent!");
		}
		this.pacijentRepository.delete(p);
		
	}

	@Override
	public Bolest addBolest(Bolest bolest) {
		this.bolestRepository.save(bolest);

		return bolest;
	}
	
	@Override
	public Bolest changeBolest(Bolest bolest) {
		Bolest p1 = this.bolestRepository.findOne(bolest.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojeca bolest!");
		}
		this.bolestRepository.save(bolest);

		return bolest;
	}

	@Override
	public void deleteBolest(Bolest bolest) {
		Bolest p1 = this.bolestRepository.findOne(bolest.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojeca bolest!");
		}
		this.bolestRepository.delete(bolest);
	}
	
	@Override
	public Simptom addSimptom(Simptom simptom) {
		this.simptomRepository.save(simptom);

		return simptom;
	}
	
	@Override
	public Simptom changeSimptom(Simptom simptom) {
		Simptom p1 = this.simptomRepository.findOne(simptom.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojeca bolest!");
		}
		this.simptomRepository.save(simptom);

		return simptom;
	}

	@Override
	public void deleteSimptom(Simptom simptom) {
		Simptom p1 = this.simptomRepository.findOne(simptom.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojeci simptom!");
		}
		this.simptomRepository.delete(simptom);
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
			throw new BadRequestException("Nepostojecai lek!");
		}
		this.lekRepository.save(lek);

		return lek;
	}

	@Override
	public void deleteLek(Lek lek) {
		Lek p1 = this.lekRepository.findOne(lek.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojecai lek!");
		}
		this.lekRepository.delete(lek);
	}

	@Override
	public Sastojak addSastojak(Sastojak sastojak) {
		this.sastojakRepository.save(sastojak);

		return sastojak;
	}
	
	@Override
	public Sastojak changeSastojak(Sastojak sastojak) {
		Sastojak p1 = this.sastojakRepository.findOne(sastojak.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojecai lek!");
		}
		this.sastojakRepository.save(sastojak);

		return sastojak;
	}

	@Override
	public void deleteSastojak(Sastojak sastojak) {
		Sastojak p1 = this.sastojakRepository.findOne(sastojak.getId());
		
		if (p1 == null) {
			throw new BadRequestException("Nepostojecai lek!");
		}
		this.sastojakRepository.delete(sastojak);

	}

	
}
