package sbz.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Bolest implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false)
	private String opis;
	
	@ManyToMany()
	private List<Simptom> simptomi;
	
	@ManyToMany()
	private List<Simptom> specificniSimptomi;
	
	@Column(nullable = false)
	@Enumerated(EnumType.ORDINAL)
	protected BolestType btype;

	public Bolest() {}
	
	public Bolest(Long id, String opis, List<Simptom> simptomi, List<Simptom> specificniSimptomi, BolestType type) {
		super();
		this.id = id;
		this.opis = opis;
		this.simptomi = simptomi;
		this.specificniSimptomi = specificniSimptomi;
		this.btype = type;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public List<Simptom> getSimptomi() {
		return simptomi;
	}

	public void setSimptomi(List<Simptom> simptomi) {
		this.simptomi = simptomi;
	}

	public List<Simptom> getSpecificniSimptomi() {
		return specificniSimptomi;
	}

	public void setSpecificniSimptomi(List<Simptom> specificniSimptomi) {
		this.specificniSimptomi = specificniSimptomi;
	}

	public BolestType getBtype() {
		return btype;
	}

	public void setBtype(BolestType type) {
		this.btype = type;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		Bolest other = (Bolest) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	
}
