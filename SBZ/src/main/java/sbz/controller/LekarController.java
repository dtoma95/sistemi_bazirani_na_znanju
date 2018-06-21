package sbz.controller;

import java.util.List;

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

import sbz.domain.Korisnik;
import sbz.domain.Pacijent;
import sbz.service.AdminService;
import sbz.service.LekarService;

@RestController
@RequestMapping("/lekar")
public class LekarController {

	@Autowired
	private LekarService lekarService;
	
	
	@RequestMapping(
			value = "/izvestajHronicna",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> registerGost() {
		
		List<Pacijent> retval = this.lekarService.izvestajHronicnaOboljenja();
		return new ResponseEntity<List<Pacijent>>(retval, HttpStatus.OK);
	}
	
}
