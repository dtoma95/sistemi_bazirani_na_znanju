package sbz.repository;

import org.springframework.data.repository.CrudRepository;

import sbz.domain.Lek;

public interface LekRepository extends CrudRepository<Lek, Long> {
	
}
