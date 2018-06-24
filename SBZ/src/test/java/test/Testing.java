package test;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.Collection;
import java.util.concurrent.TimeUnit;

import org.drools.core.ClockType;
import org.drools.core.time.SessionPseudoClock;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
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
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import sbz.SBZApplication;
import sbz.domain.Bolest;
import sbz.domain.Dijagnoza;
import sbz.domain.Pacijent;
import sbz.domain.events.Dogadjaj;
import sbz.domain.events.DogadjajType;
import sbz.domain.events.HitnoEvent;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { SBZApplication.class })
public class Testing {

	@Autowired
	private WebApplicationContext context;

	@Autowired
	private ObjectMapper mapper;
	
	private MockMvc mockMvc;
	
	@Autowired
	private  KieContainer kieContainer;
	
	@Before
	public void setUp() throws Exception {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context).build();
	}
	
	@Test
	public void pseudoClockTest() throws Exception {
        KieServices ks = KieServices.Factory.get();
        KieBaseConfiguration kbconf = ks.newKieBaseConfiguration();
        kbconf.setOption(EventProcessingOption.STREAM);
        KieBase kbase = kieContainer.newKieBase(kbconf);
        
        KieSessionConfiguration ksconf1 = ks.newKieSessionConfiguration();
        ksconf1.setOption(ClockTypeOption.get(ClockType.PSEUDO_CLOCK.getId()));
        KieSession ksession1 = kbase.newKieSession(ksconf1, null);

        runPseudoClockHeartBeat(ksession1);
        
        KieSessionConfiguration ksconf2 = ks.newKieSessionConfiguration();
        ksconf2.setOption(ClockTypeOption.get(ClockType.PSEUDO_CLOCK.getId()));
        KieSession ksession2 = kbase.newKieSession(ksconf2, null);
        
        runPseudoClockKiseonik(ksession2);
        
        KieSessionConfiguration ksconf3 = ks.newKieSessionConfiguration();
        ksconf3.setOption(ClockTypeOption.get(ClockType.PSEUDO_CLOCK.getId()));
        KieSession ksession3 = kbase.newKieSession(ksconf3, null);
        
        runPseudoClockDijaliza(ksession3);
	}
	
	private void runPseudoClockDijaliza(KieSession ksession) {
        SessionPseudoClock clock = ksession.getSessionClock();
        ksession.getAgenda().getAgendaGroup("monitoring").setFocus();
        //Dodavanje pacijenta sa hronicnom bubreznom bolesti
        Pacijent p = new Pacijent();
        p.setId(20L);
        Dijagnoza d = new Dijagnoza();
        Bolest b = new Bolest();
        b.setOpis("Hronicna bubrezna bolest");
        d.setBolest(b);
        p.setDijagnoze(new ArrayList<Dijagnoza>());
        p.getDijagnoze().add(d);
        ksession.insert(p);
        ksession.getAgenda().getAgendaGroup("monitoring").setFocus();
        int ruleCount = ksession.fireAllRules();
        //i nista se ne okida
        assertThat(ruleCount, equalTo(0));
        clock.advanceTime(1, TimeUnit.SECONDS);
        
        
        //pacijent mokri redovno
        Dogadjaj mok = new Dogadjaj(20L, 50, DogadjajType.MOKRENJE);
        ksession.insert(mok);
        clock.advanceTime(4, TimeUnit.HOURS);
        mok = new Dogadjaj(20L, 150, DogadjajType.MOKRENJE);
        ksession.insert(mok);
        ksession.getAgenda().getAgendaGroup("monitoring").setFocus();
        ruleCount = ksession.fireAllRules();
        //i nista se ne okida
        assertThat(ruleCount, equalTo(0));
        
        clock.advanceTime(1, TimeUnit.HOURS);
        
        for (int index = 0; index < 15; index++) {
            Dogadjaj beep = new Dogadjaj(20L, 1, DogadjajType.OTKUCAJ);
            ksession.insert(beep);
            clock.advanceTime(1, TimeUnit.MILLISECONDS);
        }
        //Ubrzano kucanje srca ali je mokrenje OK i dalje
        ksession.getAgenda().getAgendaGroup("monitoring").setFocus();
        ruleCount = ksession.fireAllRules();
        
        //15 sati bez mokrenja
        clock.advanceTime(15, TimeUnit.HOURS);
        
        for (int index = 0; index < 15; index++) {
            Dogadjaj beep = new Dogadjaj(20L, 1, DogadjajType.OTKUCAJ);
            ksession.insert(beep);
            clock.advanceTime(1, TimeUnit.MILLISECONDS);
        }
        
        ksession.getAgenda().getAgendaGroup("monitoring").setFocus();
        ruleCount = ksession.fireAllRules();
        assertThat(ruleCount, equalTo(1));
        Collection<HitnoEvent> newEvents = (Collection<HitnoEvent>) ksession.getObjects(new ClassObjectFilter(HitnoEvent.class));
        for (HitnoEvent hitnoEvent : newEvents) {
			System.out.println(hitnoEvent.getValue());
		}
        assertThat(newEvents.size(), equalTo(1));
    }
	 private void runPseudoClockKiseonik(KieSession ksession) {
	        SessionPseudoClock clock = ksession.getSessionClock();
	        ksession.getAgenda().getAgendaGroup("monitoring").setFocus();
	        
	        Dogadjaj beep = new Dogadjaj(1L, 50, DogadjajType.KISEONIK_RAST);
	        ksession.insert(beep);
	        clock.advanceTime(1, TimeUnit.SECONDS);
	        beep = new Dogadjaj(1L, 49, DogadjajType.KISEONIK_PAD);
	        ksession.insert(beep);
	        ksession.getAgenda().getAgendaGroup("monitoring").setFocus();
	        int ruleCount = ksession.fireAllRules();
	        assertThat(ruleCount, equalTo(0));
	        
	        clock.advanceTime(20, TimeUnit.MINUTES);
	        //prodje 20 Minuta bez rasta
	        beep = new Dogadjaj(1L, 80, DogadjajType.KISEONIK_PAD);
	        ksession.insert(beep);
	        clock.advanceTime(1, TimeUnit.SECONDS);
	        beep = new Dogadjaj(1L, 50, DogadjajType.KISEONIK_PAD);
	        ksession.insert(beep);
	        clock.advanceTime(1, TimeUnit.SECONDS);
	        ksession.getAgenda().getAgendaGroup("monitoring").setFocus();
	        ruleCount = ksession.fireAllRules();
	        assertThat(ruleCount, equalTo(1));
	        Collection<HitnoEvent> newEvents = (Collection<HitnoEvent>) ksession.getObjects(new ClassObjectFilter(HitnoEvent.class));
	        for (HitnoEvent hitnoEvent : newEvents) {
				System.out.println(hitnoEvent.getValue());
			}
	        assertThat(newEvents.size(), equalTo(1));
	    }
	
    private void runPseudoClockHeartBeat(KieSession ksession) {
        SessionPseudoClock clock = ksession.getSessionClock();
        ksession.getAgenda().getAgendaGroup("monitoring").setFocus();
        
        for (int index = 0; index < 20; index++) {
            Dogadjaj beep = new Dogadjaj(1L, 1, DogadjajType.OTKUCAJ);
            ksession.insert(beep);
            clock.advanceTime(1, TimeUnit.SECONDS);
            ksession.getAgenda().getAgendaGroup("monitoring").setFocus();
            int ruleCount = ksession.fireAllRules();
            assertThat(ruleCount, equalTo(0));
            //As long as there is a steady heart beat, no rule will fire
           // assertThat(ruleCount, equalTo(0));
        }
        clock.advanceTime(1, TimeUnit.MINUTES);
        //We manually add a lot of heartbeats at once
        for (int index = 0; index < 30; index++) {
            Dogadjaj beep = new Dogadjaj(1L, 1, DogadjajType.OTKUCAJ);
            ksession.insert(beep);
            clock.advanceTime(1, TimeUnit.MILLISECONDS);
        }
        clock.advanceTime(1, TimeUnit.SECONDS);
        Dogadjaj beep = new Dogadjaj(1L, 1, DogadjajType.OTKUCAJ);
        ksession.insert(beep);
        clock.advanceTime(1, TimeUnit.SECONDS);
        ksession.getAgenda().getAgendaGroup("monitoring").setFocus();
        int ruleCount = ksession.fireAllRules();
        assertThat(ruleCount, equalTo(1));
        Collection<HitnoEvent> newEvents = (Collection<HitnoEvent>) ksession.getObjects(new ClassObjectFilter(HitnoEvent.class));
        for (HitnoEvent hitnoEvent : newEvents) {
			System.out.println(hitnoEvent.getValue());
		}
        assertThat(newEvents.size(), equalTo(1));
    }
	
	
	private String asJsonString(final Object obj) {
		try {

			String jsonContent = mapper.writeValueAsString(obj);
			return jsonContent;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	/*
	private DTOUser jsonToUser(final String json) {
		try {
			DTOUser u = mapper.readValue(json, new TypeReference<DTOUser>() {
			});

			return u;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		

		
	}*/
}
