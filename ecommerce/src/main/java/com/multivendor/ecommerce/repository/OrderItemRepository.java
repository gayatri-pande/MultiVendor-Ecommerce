package com.multivendor.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multivendor.ecommerce.entity.Order;
import com.multivendor.ecommerce.entity.OrderItem;
import com.multivendor.ecommerce.entity.Vendor;

public interface OrderItemRepository extends JpaRepository<OrderItem , Long> {
	
	List<OrderItem> findByOrder(Order order);
	
	List<OrderItem> findByVendor(Vendor vendor);
	
	

}
