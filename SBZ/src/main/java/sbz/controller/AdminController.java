package sbz.controller;

import sbz.domain.Bolest;
import sbz.domain.Korisnik;
import sbz.domain.Lek;
import sbz.domain.Pacijent;
import sbz.domain.Sastojak;
import sbz.domain.Simptom;
import sbz.service.AdminService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	
	@RequestMapping(
			value = "/registerKorisnik",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> registerGost(@Validated @RequestBody Korisnik korisnik, WebRequest request,
			BindingResult bindingResult) {
		
		if(bindingResult.hasErrors()) {
			return new ResponseEntity<String>(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
		}
		
		this.adminService.registerLekar(korisnik);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/registerPacijent",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> registerGost(@Validated @RequestBody Pacijent pacijent, WebRequest request,
			BindingResult bindingResult) {
		
		if(bindingResult.hasErrors()) {
			return new ResponseEntity<String>(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
		}
		
		this.adminService.registerPacijent(pacijent);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/addSimptom",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> addSimptom(@Validated @RequestBody Simptom simptom, WebRequest request,
			BindingResult bindingResult) {
		
		if(bindingResult.hasErrors()) {
			return new ResponseEntity<String>(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
		}
		
		this.adminService.addSimptom(simptom);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/addBolest",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> addBolest(@Validated @RequestBody Bolest bolest, WebRequest request,
			BindingResult bindingResult) {
		
		if(bindingResult.hasErrors()) {
			return new ResponseEntity<String>(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
		}
		
		this.adminService.addBolest(bolest);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/addLek",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> addLek(@Validated @RequestBody Lek lek, WebRequest request,
			BindingResult bindingResult) {
		
		if(bindingResult.hasErrors()) {
			return new ResponseEntity<String>(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
		}
		
		this.adminService.addLek(lek);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/addSastojak",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> addSastojak(@Validated @RequestBody Sastojak sastojak, WebRequest request,
			BindingResult bindingResult) {
		
		if(bindingResult.hasErrors()) {
			return new ResponseEntity<String>(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
		}
		
		this.adminService.addSastojak(sastojak);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	@RequestMapping(
			value = "/editSimptom",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> editSimptom(@Validated @RequestBody Simptom sastojak, WebRequest request,
			BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			return new ResponseEntity<String>(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
		}
		this.adminService.changeSimptom(sastojak);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	@RequestMapping(
			value = "/editPacijent",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> editPacijent(@Validated @RequestBody Pacijent sastojak, WebRequest request,
			BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			return new ResponseEntity<String>(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
		}
		this.adminService.changePacijent(sastojak);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	@RequestMapping(
			value = "/editBolest",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> editBolest(@Validated @RequestBody Bolest sastojak, WebRequest request,
			BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			return new ResponseEntity<String>(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
		}
		this.adminService.changeBolest(sastojak);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	@RequestMapping(
			value = "/editLek",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> editLek(@Validated @RequestBody Lek sastojak, WebRequest request,
			BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			return new ResponseEntity<String>(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
		}
		this.adminService.changeLek(sastojak);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	
	@RequestMapping(
			value = "/editSastojak",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> editSastojak(@Validated @RequestBody Sastojak sastojak, WebRequest request,
			BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			return new ResponseEntity<String>(bindingResult.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
		}
		this.adminService.changeSastojak(sastojak);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}

	@RequestMapping(
			value = "/deleteSimptom/{id}",
			method = RequestMethod.DELETE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> deleteSimptom(@PathVariable("id") Long id) {
		this.adminService.deleteSimptom(id);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	@RequestMapping(
			value = "/deletePacijent/{id}",
			method = RequestMethod.DELETE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> deletePacijent(@PathVariable("id") Long id) {
		this.adminService.deletePacijent(id);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	@RequestMapping(
			value = "/deleteBolest/{id}",
			method = RequestMethod.DELETE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> deleteBolest(@PathVariable("id") Long id) {
		this.adminService.deleteBolest(id);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	@RequestMapping(
			value = "/deleteLek/{id}",
			method = RequestMethod.DELETE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> deleteLek(@PathVariable("id") Long id) {
		this.adminService.deleteLek(id);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	@RequestMapping(
			value = "/deleteSastojak/{id}",
			method = RequestMethod.DELETE,
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<?> deleteSastojak(@PathVariable("id") Long id) {
		this.adminService.deleteSastojak(id);
		return new ResponseEntity<String>("Successful!", HttpStatus.OK);
	}
	
}
