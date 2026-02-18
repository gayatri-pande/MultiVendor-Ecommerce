package com.multivendor.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.multivendor.ecommerce.dto.user.UserRegisterRequest;
import com.multivendor.ecommerce.dto.user.UserResponse;
import com.multivendor.ecommerce.entity.User;
import com.multivendor.ecommerce.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	 @Autowired
	    private UserService userService;

//	    @PostMapping("/register")
//	    public User register(@RequestBody User user) {
//	        return userService.registerUser(user);
//	    }
	 
	 @PostMapping("/register")
	 public UserResponse register(
	         @RequestBody @Valid UserRegisterRequest request) {

	     User savedUser = userService.registerUser(request);

	     UserResponse response = new UserResponse();
	     response.setId(savedUser.getId());
	     response.setName(savedUser.getName());
	     response.setEmail(savedUser.getEmail());
	     response.setRole(savedUser.getRole());
	     response.setStatus(savedUser.getStatus());
	     response.setCreatedAt(savedUser.getCreatedAt());

	     return response;
	 }


	    @GetMapping("/allUsers")
	    public List<User> getAllUsers() {
	        return userService.getAllUsers();
	    }

}
