package sbz.controller;


import sbz.domain.Korisnik;
import sbz.service.AuthenticationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
	
    @Autowired
    private AuthenticationService authenticationService;

	
    /**
     * Metoda za logovanje korisnika
     * endpoint: /ulogujSe
     * @param logovanje - DTO objekat sa informacijama o logovanju,
     * a to su email i lozinka
     * @return Poruka o uspesnosti logovanja
     */
	@RequestMapping(value = "/login", 
			method = RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> loginUser(@RequestBody Korisnik logovanje) {
		System.out.println(logovanje.getLozinka());
		
		Korisnik k = authenticationService.ulogujKorisnika(logovanje);
		return new ResponseEntity<Korisnik>(k, HttpStatus.OK);
	}
	
	/**
	 * Metoda za logout korisnika
	 * endpoint: /izlogujSe
	 * @return Poruka o uspesnosti logouta
	 */
	@RequestMapping(value = "/logout",
			method = RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> logoutUser(@RequestBody Korisnik logovanje) {

		authenticationService.izlogujKorisnika(logovanje);
		return new ResponseEntity<String>("Uspesno ste se ulogovali!", HttpStatus.OK);

    }	
}
