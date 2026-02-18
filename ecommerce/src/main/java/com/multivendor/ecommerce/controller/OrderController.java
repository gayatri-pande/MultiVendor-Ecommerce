package com.multivendor.ecommerce.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.multivendor.ecommerce.dto.order.OrderResponse;
import com.multivendor.ecommerce.dto.order.PlaceOrderRequest;
import com.multivendor.ecommerce.entity.User;
import com.multivendor.ecommerce.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    
    @GetMapping("/my")
    public List<OrderResponse> getMyOrders() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal(); // ✅ SAFE

        return orderService.getMyOrders(user);
    }

  
    @GetMapping("/{id}")
    public OrderResponse getOrderDetails(
            @PathVariable Long id,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return orderService.getOrderById(id, user); 
    }
    
    @PostMapping
    public OrderResponse placeOrder(
            @RequestBody PlaceOrderRequest request,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return orderService.placeOrder(user, request);
    }

}
