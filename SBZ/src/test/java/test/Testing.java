package test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import sbz.SBZApplication;
import sbz.domain.Dijagnoza;
import sbz.domain.Korisnik;
import sbz.domain.Simptom;
import sbz.domain.SimptomType;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { SBZApplication.class })
public class Testing {

	@Autowired
	private WebApplicationContext context;

	@Autowired
	private ObjectMapper mapper;
	
	private MockMvc mockMvc;
	
	@Before
	public void setUp() throws Exception {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context).build();
	}
	
	@Test
	public void brisanjeKvaraUspeh() throws Exception {
		Korisnik k = new Korisnik();
		k.setLozinka("lekar");
		k.setUsername("lekar");
		
		
		this.mockMvc
				.perform(post("/login").contentType(MediaType.APPLICATION_JSON).content(asJsonString(k)))
				.andExpect(status().isOk());
		
		
		
		Dijagnoza d = new Dijagnoza();
		d.setSimptomi(new ArrayList<Simptom>());
		
		Simptom s1 = new Simptom(100L, "Curenje iz nosa", 0,  SimptomType.NORMAL);
		d.getSimptomi().add(s1);
		s1 = new Simptom(101L, "Bol u grlu", 0,  SimptomType.NORMAL);
		d.getSimptomi().add(s1);
		s1 = new Simptom(102L, "Glavobolja", 0,  SimptomType.NORMAL);
		d.getSimptomi().add(s1);
		s1 = new Simptom(103L, "Kijanje", 0,  SimptomType.NORMAL);
		d.getSimptomi().add(s1);
		s1 = new Simptom(104L, "Kasalj", 0,  SimptomType.NORMAL);
		d.getSimptomi().add(s1);
		s1 = new Simptom(104L, "Temperatura", 39,  SimptomType.NUMERIC);
		d.getSimptomi().add(s1);
		
		d.setLekar(k);
		
		this.mockMvc
		.perform(post("/lekar/dijagnoza/1").contentType(MediaType.APPLICATION_JSON).content(asJsonString(d)))
		.andExpect(status().isOk());
		
		//this.mockMvc.perform(get("/lekar/izvestajHronicna"))
			//	.andExpect(status().isOk());
		
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
