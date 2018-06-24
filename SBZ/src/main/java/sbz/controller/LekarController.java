package sbz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import sbz.DTO.DTOBolesti;
import sbz.DTO.DTOValidacija;
import sbz.domain.Bolest;
import sbz.domain.Dijagnoza;
import sbz.domain.Pacijent;
import sbz.domain.Simptom;
import sbz.service.LekarService;

@RestController
@RequestMapping("/lekar")
public class LekarController {

	@Autowired
	private LekarService lekarService;
	
	@RequestMapping(
			value = "/dijagnoza/{pacientId}",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> dijagnoza(@PathVariable("pacientId") Long pacijentId,
			@RequestBody Dijagnoza dijagnoza) {
		
		DTOBolesti retval = new DTOBolesti();
		
		retval.setGrupa2(this.lekarService.dijagnozaBolesti(dijagnoza, pacijentId, "bolesti2"));
		dijagnoza.setBolest(null);
		retval.setGrupa1(this.lekarService.dijagnozaBolesti(dijagnoza, pacijentId, "bolesti"));
		dijagnoza.setBolest(null);
		retval.setGrupa3(this.lekarService.dijagnozaBolesti(dijagnoza, pacijentId, "bolesti3"));
		
		return new ResponseEntity<DTOBolesti>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/validacija/{pacientId}",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> validacijaDijagnoze(@PathVariable("pacientId") Long pacijentId,
			@RequestBody Dijagnoza dijagnoza) {
		
		DTOValidacija retval = new DTOValidacija();
		
		retval.setLekovi(this.lekarService.validacijaLeka(dijagnoza, pacijentId));
		retval.setSastojci(this.lekarService.validacijaSastojaka(dijagnoza, pacijentId));
		
		return new ResponseEntity<DTOValidacija>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/izvestaj/{grupa}/{lekar}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> izvestaj(@PathVariable("grupa") String grupa,
			@PathVariable("lekar") String lekar) {
		
		List<Pacijent> retval= this.lekarService.izvestaj(grupa, lekar);
		return new ResponseEntity<List<Pacijent>>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/addDijagnoza/{pacientId}",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> addDijagnoza(@PathVariable("pacientId") Long pacijentId,
			@RequestBody Dijagnoza dijagnoza) {
		
		Dijagnoza d =lekarService.addDijagnoza(dijagnoza, pacijentId);
		
		
		return new ResponseEntity<Dijagnoza>(d, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/upitBolesti",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> upitBolest(@RequestBody Dijagnoza dijagnoza) {
		
		List<Bolest> retval =lekarService.uptiBolesti(dijagnoza);
		
		
		return new ResponseEntity<List<Bolest>>(retval, HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/upitSimptomi",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> upitSimptomi(@RequestBody Dijagnoza dijagnoza) {
		
		List<Simptom> retval =lekarService.uptiSimptomi(dijagnoza);
		
		
		return new ResponseEntity<List<Simptom>>(retval, HttpStatus.OK);
	}
}
