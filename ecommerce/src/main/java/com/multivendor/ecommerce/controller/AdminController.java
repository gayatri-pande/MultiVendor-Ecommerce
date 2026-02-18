package com.multivendor.ecommerce.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.multivendor.ecommerce.dto.order.AdminOrderResponse;
import com.multivendor.ecommerce.entity.Vendor;
import com.multivendor.ecommerce.service.OrderService;
import com.multivendor.ecommerce.service.VendorService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
	private final VendorService vendorService;
	private final OrderService orderService;
	
	public AdminController(VendorService vendorService , OrderService orderService) {
		this.vendorService = vendorService;
		this.orderService = orderService;
	}
	
	@PutMapping("vendors/{vendorId}/approve")
	public Vendor approveVendor(@PathVariable Long vendorId) {
		return vendorService.approveVendor(vendorId)
;	}
	
	@GetMapping("/orders")
	public List<AdminOrderResponse> getAllOrders() {
	    return orderService.getAllOrdersForAdmin();
	}


}
