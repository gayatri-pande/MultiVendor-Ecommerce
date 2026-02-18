package com.multivendor.ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multivendor.ecommerce.entity.Order;
import com.multivendor.ecommerce.entity.User;

public interface OrderRepository extends JpaRepository<Order , Long>{
	
	List<Order> findByUser(User user);
	
	 Optional<Order> findByIdAndUser_Id(Long orderId, Long userId);
	 
	 Optional<Order> findByIdAndUser(Long id, User user);

}
