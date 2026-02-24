package com.multivendor.ecommerce;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.multivendor.ecommerce.entity.User;
import com.multivendor.ecommerce.enums.Role;
import com.multivendor.ecommerce.repository.UserRepository;

@SpringBootApplication
public class EcommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
	}

	
	@Bean
	CommandLineRunner createAdmin(UserRepository userRepository,
	                              PasswordEncoder passwordEncoder) {
	    return args -> {

	        User admin = userRepository.findByEmail("admin@multivendor.com")
	                .orElse(new User());

	        admin.setName("Admin");
	        admin.setEmail("admin@multivendor.com");
	        admin.setPassword(passwordEncoder.encode("admin123"));
	        admin.setRole(Role.ADMIN);

	        userRepository.save(admin);

	        System.out.println("Admin user ensured!");
	    };
	}

}

