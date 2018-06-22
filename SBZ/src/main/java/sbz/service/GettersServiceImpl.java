package sbz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sbz.domain.Bolest;
import sbz.domain.Dijagnoza;
import sbz.domain.Lek;
import sbz.domain.Pacijent;
import sbz.domain.Simptom;
import sbz.exceptions.BadRequestException;
import sbz.repository.BolestRepository;
import sbz.repository.LekRepository;
import sbz.repository.PacijentRepository;
import sbz.repository.SimptomRepository;

@Service
public class GettersServiceImpl implements GettersService {
	
	@Autowired
	private  PacijentRepository pacijentRepository;
	
	@Autowired
	private  BolestRepository bolestRepository;
	
	@Autowired
	private  SimptomRepository simptomRepository;
	
	@Autowired
	private  LekRepository lekRepository;
	
	@Override
	public List<Pacijent> getPacijenti() {
		return (List<Pacijent>) pacijentRepository.findAll();
	}

	@Override
	public List<Bolest> getBolesti() {
		return (List<Bolest>) bolestRepository.findAll();
	}

	@Override
	public List<Simptom> getSimptomi() {
		return (List<Simptom>) simptomRepository.findAll();
	}

	@Override
	public List<Lek> getLekovi() {
		return (List<Lek>) lekRepository.findAll();
	}

	@Override
	public List<Dijagnoza> getKarton(long pacijentId) {
		Pacijent p = pacijentRepository.findOne(pacijentId);
		if (p == null) {
			throw new BadRequestException("Nepostojeci pacijent!");
		}
		return p.getDijagnoze();
	}

	@Override
	public Pacijent getPacijent(long pacijentId) {
		Pacijent p = pacijentRepository.findOne(pacijentId);
		if (p == null) {
			throw new BadRequestException("Nepostojeci pacijent!");
		}
		return p;
	}

}
