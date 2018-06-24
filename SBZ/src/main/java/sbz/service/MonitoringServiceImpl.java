package sbz.service;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;

import java.util.Collection;
import java.util.concurrent.TimeUnit;

import org.drools.core.ClockType;
import org.kie.api.KieBase;
import org.kie.api.KieBaseConfiguration;
import org.kie.api.KieServices;
import org.kie.api.conf.EventProcessingOption;
import org.kie.api.runtime.ClassObjectFilter;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.KieSessionConfiguration;
import org.kie.api.runtime.conf.ClockTypeOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import sbz.domain.events.Dogadjaj;
import sbz.domain.events.DogadjajType;
import sbz.domain.events.HitnoEvent;
import sbz.websocket.HitnoEventProducer;

@Service
public class MonitoringServiceImpl implements MonitoringService{
	@Autowired
	private  KieContainer kieContainer;
	
	@Autowired
	private HitnoEventProducer hitnoEventProducer;
	
	private KieSession ksession;
	
	@EventListener(ApplicationReadyEvent.class)
	public void startMonitoring() {
		KieServices ks = KieServices.Factory.get();
        KieBaseConfiguration kbconf = ks.newKieBaseConfiguration();
        kbconf.setOption(EventProcessingOption.STREAM);
        KieBase kbase = kieContainer.newKieBase(kbconf);
        
        KieSessionConfiguration ksconf1 = ks.newKieSessionConfiguration();
        ksession = kbase.newKieSession(ksconf1, null);
		System.out.println("hej");
		Thread t = new Thread() {
            @Override
            public void run() {
                while (true) {
                	ksession.getAgenda().getAgendaGroup("monitoring").setFocus();
                	ksession.fireAllRules(); // fireuntilHalt mi nije radilo
                	Collection<HitnoEvent> newEvents = (Collection<HitnoEvent>) ksession.getObjects(new ClassObjectFilter(HitnoEvent.class));
                    for (HitnoEvent hitnoEvent : newEvents) {
            			System.out.println(hitnoEvent.getValue());
            			hitnoEventProducer.sendMessageTo(hitnoEvent);
            			ksession.delete(ksession.getFactHandle(hitnoEvent));
            		}
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                    	System.out.println("Bad");
                    }
                }
            }
        };
        t.setDaemon(true);
        t.start();
        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
        	System.out.println("Bad");
        }
	}

	@Override
	public void dodajOtkucajSimulation(final int broj) {
		Thread t = new Thread() {
            @Override
            public void run() {
            	 for (int index = 0; index < broj; index++) {
     	            Dogadjaj beep = new Dogadjaj(1L, 1, DogadjajType.OTKUCAJ);
     	            ksession.insert(beep);
     	            System.out.println("heartbeat");
     	         }
            	 try {
                     Thread.sleep(10);
                 } catch (InterruptedException e) {
                     //do nothing
                 }
            }
        };
        t.setDaemon(true);
        t.start();
        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
            //do nothing
        }
		
	}
}
