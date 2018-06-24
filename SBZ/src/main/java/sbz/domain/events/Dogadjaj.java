package sbz.domain.events;

import java.io.Serializable;

import org.kie.api.definition.type.Role;

@Role(Role.Type.EVENT)
//@Expires("10m")
public class Dogadjaj implements Serializable {

    private static final long serialVersionUID = 1L;
    
    private Long pacijentId;
    private double value;
    private DogadjajType dtype;
    
    public Dogadjaj() {
        super();
    }

	public Dogadjaj(Long pacijentId, double value, DogadjajType dtype) {
		super();
		this.pacijentId = pacijentId;
		this.value = value;
		this.dtype = dtype;
	}

	public Long getPacijentId() {
		return pacijentId;
	}

	public void setPacijentId(Long pacijentId) {
		this.pacijentId = pacijentId;
	}

	public double getValue() {
		return value;
	}

	public void setValue(double value) {
		this.value = value;
	}

	public DogadjajType getDtype() {
		return dtype;
	}

	public void setDtype(DogadjajType dtype) {
		this.dtype = dtype;
	}
}
