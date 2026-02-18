package com.multivendor.ecommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multivendor.ecommerce.entity.Category;
import com.multivendor.ecommerce.entity.Product;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
//	Optional<Product> findById(Long id);


}
