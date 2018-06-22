package sbz.service;

import sbz.domain.Korisnik;

public interface AuthenticationService {

	Korisnik ulogujKorisnika(Korisnik logovanje);
	boolean izlogujKorisnika(Korisnik logovanje);
}
