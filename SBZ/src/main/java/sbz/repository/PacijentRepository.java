package sbz.repository;

import org.springframework.data.repository.CrudRepository;

import sbz.domain.Pacijent;

public interface PacijentRepository extends CrudRepository<Pacijent, Long> {
	
}
