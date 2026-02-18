package com.multivendor.ecommerce.dto.user;



import com.multivendor.ecommerce.enums.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterRequest {
	
	@NotBlank(message = "Name is Required")
	private String name;
	
	@Email(message = "Invalid email")
	@NotBlank(message = "Email is required")
	private String email;
	
	@NotBlank(message = "Password is required")
	private String password;
	
	@NotNull(message = "Role is required")
	private Role role;

}
