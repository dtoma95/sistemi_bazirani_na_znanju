package sbz.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
@Entity
public class Dijagnoza implements Serializable  {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false)
	private Date datum;
	
	@ManyToOne
	private Korisnik lekar;
	
	@ManyToOne
	private Pacijent pacijent;
	
	@ManyToOne
	private Bolest bolest;
	
	@ManyToMany
	private List<Simptom> simptomi;
	
	@ManyToMany
	private List<Lek> propisano;
	
	@Column(nullable = false)
	@Enumerated(EnumType.ORDINAL)
	protected BolestType type;

	public boolean timeDiffDays(long days) {
		
		Date currentDate = new Date();
		long milidays = days * 24 * 60 * 60 * 1000L;
		return currentDate.before(new Date((this.datum.getTime() + milidays)));
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDatum() {
		return datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

	public Korisnik getLekar() {
		return lekar;
	}

	public void setLekar(Korisnik lekar) {
		this.lekar = lekar;
	}

	public Pacijent getPacijent() {
		return pacijent;
	}

	public void setPacijent(Pacijent pacijent) {
		this.pacijent = pacijent;
	}

	public Bolest getBolest() {
		return bolest;
	}

	public void setBolest(Bolest bolest) {
		this.bolest = bolest;
	}

	public List<Simptom> getSimptomi() {
		return simptomi;
	}

	public void setSimptomi(List<Simptom> simptomi) {
		this.simptomi = simptomi;
	}

	public List<Lek> getPropisano() {
		return propisano;
	}

	public void setPropisano(List<Lek> propisano) {
		this.propisano = propisano;
	}

	public BolestType getType() {
		return type;
	}

	public void setType(BolestType type) {
		this.type = type;
	}

	public Dijagnoza() {}
	
	public Dijagnoza(Long id, Date datum, Korisnik lekar, Pacijent pacijent, Bolest bolest, List<Simptom> simptomi,
			List<Lek> propisano, BolestType type) {
		super();
		this.id = id;
		this.datum = datum;
		this.lekar = lekar;
		this.pacijent = pacijent;
		this.bolest = bolest;
		this.simptomi = simptomi;
		this.propisano = propisano;
		this.type = type;
	}
	
	
	
}
