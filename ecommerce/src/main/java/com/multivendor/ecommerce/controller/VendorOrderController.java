package com.multivendor.ecommerce.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.multivendor.ecommerce.dto.order.UpdateOrderStatusRequest;
import com.multivendor.ecommerce.dto.order.VendorOrderItemResponse;
import com.multivendor.ecommerce.entity.User;
import com.multivendor.ecommerce.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/vendor/orders")
@RequiredArgsConstructor
public class VendorOrderController {

    private final OrderService orderService;


    @GetMapping
    public List<VendorOrderItemResponse> getVendorOrders(
            Authentication authentication
    ) {
        User vendorUser = (User) authentication.getPrincipal();
        return orderService.getVendorOrderItems(vendorUser);
    }

    
    @PutMapping("/{orderItemId}/status")
    public String updateOrderItemStatus(
            @PathVariable Long orderItemId,
            @RequestBody UpdateOrderStatusRequest request,
            Authentication authentication
    ) {
        User vendorUser = (User) authentication.getPrincipal();

        orderService.updateVendorOrderItemStatus(
                orderItemId,
                vendorUser,
                request.getStatus()
        );

        return "Order status updated successfully";
    }
}
