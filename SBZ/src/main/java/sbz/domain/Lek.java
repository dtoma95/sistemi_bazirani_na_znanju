package sbz.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
@Entity
public class Lek implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false)
	@Enumerated(EnumType.ORDINAL)
	protected LekType type;
	
	@ManyToMany()
	private List<Sastojak> sastojci;

	public Lek() {}
	
	public Lek(Long id, LekType type, List<Sastojak> sastojci) {
		super();
		this.id = id;
		this.type = type;
		this.sastojci = sastojci;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LekType getType() {
		return type;
	}

	public void setType(LekType type) {
		this.type = type;
	}

	public List<Sastojak> getSastojci() {
		return sastojci;
	}

	public void setSastojci(List<Sastojak> sastojci) {
		this.sastojci = sastojci;
	}
	
	
}
