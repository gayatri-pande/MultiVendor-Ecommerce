package com.multivendor.ecommerce.repository;

import java.util.Optional;

import com.multivendor.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
	Optional<User> findByEmail(String email);


    boolean existsByEmail(String email);
    
//    Optional<User> findByUsername(String username);
}
