package com.multivendor.ecommerce.dto.user;

import java.time.LocalDateTime;

import com.multivendor.ecommerce.enums.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
	
	  private Long id;
	    private String name;
	    private String email;
	    private Role role;
	    private String status;
	    private LocalDateTime createdAt;
		
}
