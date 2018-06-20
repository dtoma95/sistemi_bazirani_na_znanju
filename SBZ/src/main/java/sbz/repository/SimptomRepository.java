package sbz.repository;

import org.springframework.data.repository.CrudRepository;

import sbz.domain.Simptom;

public interface SimptomRepository extends CrudRepository<Simptom, Long> {
	
}
