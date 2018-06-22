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
	
	@Column(nullable = false, unique = true)
	private String naziv;
	
	@Column(nullable = false)
	@Enumerated(EnumType.ORDINAL)
	protected LekType ltype;
	
	@ManyToMany()
	private List<Sastojak> sastojci;

	public Lek() {}
	
	public Lek(Long id, LekType type, List<Sastojak> sastojci) {
		super();
		this.id = id;
		this.ltype = type;
		this.sastojci = sastojci;
	}

	
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((naziv == null) ? 0 : naziv.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Lek other = (Lek) obj;
		if (naziv == null) {
			if (other.naziv != null)
				return false;
		} else if (!naziv.equals(other.naziv))
			return false;
		return true;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LekType getLtype() {
		return ltype;
	}

	public void setLtype(LekType type) {
		this.ltype = type;
	}

	public List<Sastojak> getSastojci() {
		return sastojci;
	}

	public void setSastojci(List<Sastojak> sastojci) {
		this.sastojci = sastojci;
	}
	
	
}
