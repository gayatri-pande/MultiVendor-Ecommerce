package com.multivendor.ecommerce.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.multivendor.ecommerce.dto.user.UserRegisterRequest;
import com.multivendor.ecommerce.entity.User;
import com.multivendor.ecommerce.exception.EmailAlreadyExistsException;
import com.multivendor.ecommerce.exception.UserNotFoundException;
import com.multivendor.ecommerce.repository.UserRepository;

@Service
public class UserService {
	
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository , PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        

    }

 
    
    public User registerUser(UserRegisterRequest dto) {
    	
    	 if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
             throw new EmailAlreadyExistsException("Email already registered");
         }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
       
		user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());
        user.setStatus("ACTIVE");

        return userRepository.save(user);
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(
                        "User not found with id: " + id
                ));
    }
    
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

   
  

}
