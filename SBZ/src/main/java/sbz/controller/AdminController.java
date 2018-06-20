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
			value = "/registerLekar",
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
	
}
