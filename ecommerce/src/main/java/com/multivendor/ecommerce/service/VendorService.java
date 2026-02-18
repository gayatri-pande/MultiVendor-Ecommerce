package com.multivendor.ecommerce.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.multivendor.ecommerce.dto.vendor.VendorMeResponse;
import com.multivendor.ecommerce.dto.vendor.VendorRegisterRequest;
import com.multivendor.ecommerce.entity.User;
import com.multivendor.ecommerce.entity.Vendor;
import com.multivendor.ecommerce.enums.Role;
import com.multivendor.ecommerce.exception.VendorAlreadyExistsException;
import com.multivendor.ecommerce.exception.VendorNotFoundException;
import com.multivendor.ecommerce.repository.UserRepository;
import com.multivendor.ecommerce.repository.VendorRepository;

import jakarta.transaction.Transactional;

@Service
public class VendorService {

    private static final Logger log =
            LoggerFactory.getLogger(VendorService.class);

    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;

    public VendorService(VendorRepository vendorRepository,
                         UserRepository userRepository) {
        this.vendorRepository = vendorRepository;
        this.userRepository = userRepository;
    }


    public VendorMeResponse getMyVendorStatus() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
            !authentication.isAuthenticated() ||
            authentication.getPrincipal() instanceof String) {

            return new VendorMeResponse(false, null);
        }

        User user = (User) authentication.getPrincipal();

        return vendorRepository.findByUser(user)
                .map(vendor ->
                        new VendorMeResponse(
                                vendor.isApproved(),
                                vendor.getShopName()
                        )
                )
                .orElse(new VendorMeResponse(false, null));
    }



    @Transactional
    public Vendor registerVendor(VendorRegisterRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Unauthorized");
        }

        Object principal = authentication.getPrincipal();

        if (!(principal instanceof User user)) {
            throw new RuntimeException("Invalid user principal");
        }

        log.info("➡ Registering vendor for user id {}", user.getId());

        if (vendorRepository.existsByUser(user)) {
            throw new VendorAlreadyExistsException("Vendor already registered");
        }

        Vendor vendor = new Vendor();
        vendor.setUser(user);
        vendor.setShopName(request.getShopName());
        vendor.setApproved(false);

        Vendor saved = vendorRepository.save(vendor);
        log.info("✅ Vendor saved with id {}", saved.getId());

        return saved;
    }

    
    @Transactional
    public Vendor approveVendor(Long vendorId) {

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() ->
                        new VendorNotFoundException(
                                "Vendor not found with id: " + vendorId));

        vendor.setApproved(true);

        User user = vendor.getUser();
        user.setRole(Role.VENDOR);
        userRepository.save(user);

        log.info("✅ Vendor approved & role updated for user {}", user.getEmail());

        return vendorRepository.save(vendor);
    }


    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }
    
    
    
    public Vendor getVendorByUser(User user) {
        return vendorRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
    }


}
