package sbz.repository;

import org.springframework.data.repository.CrudRepository;

import sbz.domain.Korisnik;

public interface KorisnikRepository extends CrudRepository<Korisnik, Long> {

	Korisnik findByUsername(String username);
	
}