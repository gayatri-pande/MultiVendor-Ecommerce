package com.multivendor.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multivendor.ecommerce.entity.User;
import com.multivendor.ecommerce.entity.Vendor;

public interface VendorRepository extends JpaRepository<Vendor , Long> {
	
	Optional<Vendor> findById(Long id);
	boolean existsByUser(User user);
	
	Optional<Vendor> findByUser(User user);

}
