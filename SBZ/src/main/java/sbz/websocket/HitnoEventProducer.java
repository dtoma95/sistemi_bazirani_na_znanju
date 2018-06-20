package sbz.websocket;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import sbz.domain.Pacijent;


/*
 * Izdvojena komponenta koja sadrzi atribut SimpMessagingTemplate
 * cije metode vrse slanje poruka sa servera na pretplacene klijente.
 */
@Component
public class HitnoEventProducer {

	private static final SimpleDateFormat dateFormatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	
	/*
	 * Implementira SimpMessagesSendingOperations klasu koja sadrzi metode za slanje poruka korisnicima.
	 */
	@Autowired
	private SimpMessagingTemplate template;
	
	public void sendMessageTo(Pacijent p, String vrsta) {
		String valasz = "OHOJOJ";
		/*
		 * metoda convertAndSend() vrsi slanje poruke sa servera na klijente koji
		 * su se pretplatili na odredjeni topic.
		 */
		//this.template.convertAndSend("/javiGotovo/" + jelo.getPorudzbina(), valasz);
	}

}
