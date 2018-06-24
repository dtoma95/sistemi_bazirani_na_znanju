package sbz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import sbz.DTO.DTOPacijent;
import sbz.domain.Bolest;
import sbz.domain.Dijagnoza;
import sbz.domain.Korisnik;
import sbz.domain.Lek;
import sbz.domain.Pacijent;
import sbz.domain.Sastojak;
import sbz.domain.Simptom;
import sbz.service.GettersService;

@RestController
public class GettersController {

	@Autowired
	private GettersService gettersService;
	
	@RequestMapping(
			value = "/getPacijent/{pacijentId}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getPacijent(@PathVariable("pacijentId") Long pacijentId) {
		
		Pacijent retval = this.gettersService.getPacijent(pacijentId);
		return new ResponseEntity<DTOPacijent>(new DTOPacijent(retval), HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/getPacijenti",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getPacijenti() {
		
		List<Pacijent> retval = this.gettersService.getPacijenti();
		return new ResponseEntity<List<Pacijent>>(retval, HttpStatus.OK);
	}

	@RequestMapping(
			value = "/getBolest/{pacijentId}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getBolest(@PathVariable("pacijentId") Long pacijentId) {
		
		Bolest retval = this.gettersService.getBolest(pacijentId);
		return new ResponseEntity<Bolest>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/getBolesti",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getBolesti() {
		
		List<Bolest> retval = this.gettersService.getBolesti();
		return new ResponseEntity<List<Bolest>>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/getSimptom/{pacijentId}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getSimptom(@PathVariable("pacijentId") Long pacijentId) {
		
		Simptom retval = this.gettersService.getSimptom(pacijentId);
		return new ResponseEntity<Simptom>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/getSimptomi",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getSimptomi() {
		
		List<Simptom> retval = this.gettersService.getSimptomi();
		return new ResponseEntity<List<Simptom>>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/getLek/{pacijentId}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getLek(@PathVariable("pacijentId") Long pacijentId) {
		
		Lek retval = this.gettersService.getLek(pacijentId);
		return new ResponseEntity<Lek>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/getLekovi",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getLekovi() {
		
		List<Lek> retval = this.gettersService.getLekovi();
		return new ResponseEntity<List<Lek>>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/getSastojak/{pacijentId}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getSastojak(@PathVariable("pacijentId") Long pacijentId) {
		
		Sastojak retval = this.gettersService.getSastojak(pacijentId);
		return new ResponseEntity<Sastojak>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/getSastojci",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getSastojci() {
		
		List<Sastojak> retval = this.gettersService.getSastojci();
		return new ResponseEntity<List<Sastojak>>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/getKorisnik/{pacijentId}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getKorisnik(@PathVariable("pacijentId") Long pacijentId) {
		
		Korisnik retval = this.gettersService.getKorisnik(pacijentId);
		return new ResponseEntity<Korisnik>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/getKorisnici",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getKorisnici() {
		
		List<Korisnik> retval = this.gettersService.getKorisnici();
		return new ResponseEntity<List<Korisnik>>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/getKarton/{pacijentId}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getKarton(@PathVariable("pacientId") Long pacijentId) {
		
		List<Dijagnoza> retval = this.gettersService.getKarton(pacijentId);
		return new ResponseEntity<List<Dijagnoza>>(retval, HttpStatus.OK);
	}
	
}