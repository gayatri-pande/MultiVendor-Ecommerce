package com.multivendor.ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multivendor.ecommerce.entity.Order;
import com.multivendor.ecommerce.entity.Product;
import com.multivendor.ecommerce.entity.Vendor;

public interface ProductRepository extends JpaRepository<Product , Long> {
	
	List<Product> findByVendor(Vendor vendor);
	
	List<Product> findByCategoryId(int CategoryId);

	Optional<Product> findById(Long productId);

}
