package sbz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@EnableTransactionManagement
@EnableAsync
@SpringBootApplication
public class SBZApplication {

	public static void main(String[] args) {
		SpringApplication.run(SBZApplication.class, args);
	}
}

