package sbz.domain.events;

import java.io.Serializable;

import org.kie.api.definition.type.Role;

@Role(Role.Type.EVENT)
public class HitnoEvent implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long pacijentId;
	private String value;
	
	public HitnoEvent() {
		super();
	}
	
	public HitnoEvent(Long pacijentId, String value) {
		super();
		this.pacijentId = pacijentId;
		this.value = value;
	}

	public Long getPacijentId() {
		return pacijentId;
	}
	public void setPacijentId(Long pacijentId) {
		this.pacijentId = pacijentId;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	
}
