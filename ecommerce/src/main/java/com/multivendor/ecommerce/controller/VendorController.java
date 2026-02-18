package com.multivendor.ecommerce.controller;

import java.util.List;
import java.util.Map;

//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.security.core.Authentication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.multivendor.ecommerce.dto.vendor.VendorRegisterRequest;
import com.multivendor.ecommerce.entity.User;
import com.multivendor.ecommerce.entity.Vendor;
import com.multivendor.ecommerce.service.UserService;
import com.multivendor.ecommerce.service.VendorService;

//import ch.qos.logback.classic.Logger;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {
	
	private static final Logger log = 
			LoggerFactory.getLogger(VendorController.class);

    private final VendorService vendorService;
    private final  UserService userService ;

    public VendorController(VendorService vendorService , UserService userService) {
        this.vendorService = vendorService;
       this.userService = userService;
    }

    @PostMapping("/register")
    
   
 
    public Vendor registerVendor(
            @Valid @RequestBody VendorRegisterRequest request) {

        return vendorService.registerVendor(request);
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getMyVendorStatus(Authentication authentication) {

       
        if (authentication == null ) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

       
        String email = authentication.getName(); 

        
        User user = userService.getUserByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }


        Vendor vendor = vendorService.getVendorByUser(user);

        if (vendor == null) {
           
            return ResponseEntity.ok(
                Map.of(
                    "approved", false,
                    "shopName", null
                )
            );
        }

        
        return ResponseEntity.ok(
            Map.of(
                "approved", vendor.isApproved(),
                "shopName", vendor.getShopName()
            )
        );
    }


    

//    @GetMapping("/me")
//    public VendorMeResponse me() {
//    	log.info("/api/vendors/me HIT");
//        return vendorService.getMyVendorStatus();
//    }


    @GetMapping("/all")
    public List<Vendor> getAllVendors() {
        return vendorService.getAllVendors();
    }
}
