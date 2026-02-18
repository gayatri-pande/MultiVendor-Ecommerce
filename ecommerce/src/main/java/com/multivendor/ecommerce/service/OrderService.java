package com.multivendor.ecommerce.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.multivendor.ecommerce.dto.order.AdminOrderItemResponse;
import com.multivendor.ecommerce.dto.order.AdminOrderResponse;
import com.multivendor.ecommerce.dto.order.OrderItemRequest;
import com.multivendor.ecommerce.dto.order.OrderItemResponse;
import com.multivendor.ecommerce.dto.order.OrderResponse;
import com.multivendor.ecommerce.dto.order.PlaceOrderRequest;
import com.multivendor.ecommerce.dto.order.VendorOrderItemResponse;
import com.multivendor.ecommerce.entity.Order;
import com.multivendor.ecommerce.entity.OrderItem;
import com.multivendor.ecommerce.entity.Product;
import com.multivendor.ecommerce.entity.User;
import com.multivendor.ecommerce.entity.Vendor;
import com.multivendor.ecommerce.enums.OrderItemStatus;
import com.multivendor.ecommerce.enums.OrderStatus;
import com.multivendor.ecommerce.repository.OrderItemRepository;
import com.multivendor.ecommerce.repository.OrderRepository;
import com.multivendor.ecommerce.repository.ProductRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final VendorService vendorService;


    public List<OrderResponse> getMyOrders(User user) {
        return orderRepository.findByUser(user)
                .stream()
                .map(this::mapOrder)
                .collect(Collectors.toList());
    }

    
    public OrderResponse getOrderById(Long orderId, User user) {
        Order order = orderRepository.findByIdAndUser(orderId, user)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapOrder(order);
    }

    
    @Transactional
    public OrderResponse placeOrder(User user, PlaceOrderRequest request) {

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new RuntimeException("Order must contain at least one item");
        }

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.CREATED); // ✅ ORDER STATUS
        order.setCreatedAt(LocalDateTime.now());

        order = orderRepository.save(order);

        double totalAmount = 0;
        List<OrderItemResponse> itemResponses = new ArrayList<>();

        for (OrderItemRequest itemReq : request.getItems()) {

            Product product = productRepository
                    .findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStock() < itemReq.getQuantity()) {
                throw new RuntimeException(
                        "Insufficient stock for product: " + product.getName());
            }

            double price = product.getPrice();
            int quantity = itemReq.getQuantity();
            totalAmount += price * quantity;

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setVendor(product.getVendor());
            orderItem.setPriceAtPurchase(price);
            orderItem.setQuantity(quantity);
            orderItem.setStatus(OrderItemStatus.CREATED); // ✅ ITEM STATUS

            orderItemRepository.save(orderItem);

            product.setStock(product.getStock() - quantity);
            productRepository.save(product);

            OrderItemResponse itemResponse = new OrderItemResponse();
            itemResponse.setProductName(product.getName());
            itemResponse.setPrice(price);
            itemResponse.setQuantity(quantity);
            itemResponses.add(itemResponse);
        }

        order.setTotalAmount(totalAmount);
        orderRepository.save(order);

        OrderResponse response = new OrderResponse();
        response.setOrderId(order.getId());
        response.setStatus(order.getStatus().name()); // ✅ enum → string
        response.setTotalAmount(totalAmount);
        response.setItems(itemResponses);

        return response;
    }

    
    public List<VendorOrderItemResponse> getVendorOrderItems(User vendorUser) {

        Vendor vendor = vendorService.getVendorByUser(vendorUser);

        return orderItemRepository.findByVendor(vendor)
                .stream()
                .map(item -> {
                    VendorOrderItemResponse dto = new VendorOrderItemResponse();
                    dto.setOrderItemId(item.getId());
                    dto.setOrderId(item.getOrder().getId());
                    dto.setProductName(item.getProduct().getName());
                    dto.setQuantity(item.getQuantity());
                    dto.setPrice(item.getPriceAtPurchase());
                    dto.setStatus(item.getStatus()); // enum → string
                    dto.setOrderedAt(item.getOrder().getCreatedAt());
                    return dto;
                })
                .toList();
    }

 
    @Transactional
    public void updateVendorOrderItemStatus(
            Long orderItemId,
            User vendorUser,
            OrderItemStatus newStatus) {

        OrderItem orderItem = orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new RuntimeException("Order item not found"));

        if (!orderItem.getVendor().getUser().getId()
                .equals(vendorUser.getId())) {
            throw new RuntimeException("You are not allowed to update this order item");
        }

        OrderItemStatus currentStatus = orderItem.getStatus();

        if (currentStatus == OrderItemStatus.CREATED &&
            newStatus == OrderItemStatus.SHIPPED) {

            orderItem.setStatus(OrderItemStatus.SHIPPED);

        } else if (currentStatus == OrderItemStatus.SHIPPED &&
                   newStatus == OrderItemStatus.DELIVERED) {

            orderItem.setStatus(OrderItemStatus.DELIVERED);

        } else {
            throw new RuntimeException(
                    "Invalid status transition from " +
                    currentStatus + " to " + newStatus);
        }

        orderItemRepository.save(orderItem);
        
        Order order = orderItem.getOrder();

        List<OrderItem> allItems =
                orderItemRepository.findByOrder(order);

        boolean allDelivered = allItems.stream()
                .allMatch(i -> i.getStatus() == OrderItemStatus.DELIVERED);

        boolean allShipped = allItems.stream()
                .allMatch(i -> i.getStatus() == OrderItemStatus.SHIPPED);

        if (allDelivered) {
            order.setStatus(OrderStatus.DELIVERED);
        } else if (allShipped) {
            order.setStatus(OrderStatus.SHIPPED);
        }

        orderRepository.save(order);


    }

   
    private OrderResponse mapOrder(Order order) {

        List<OrderItemResponse> items = order.getItems()
                .stream()
                .map(this::mapItem)
                .collect(Collectors.toList());

        OrderResponse response = new OrderResponse();
        response.setOrderId(order.getId());
        response.setStatus(order.getStatus().name()); 
        response.setTotalAmount(order.getTotalAmount());
        response.setItems(items);

        return response;
    }

    private OrderItemResponse mapItem(OrderItem item) {
        OrderItemResponse dto = new OrderItemResponse();
        dto.setProductName(item.getProduct().getName());
        dto.setPrice(item.getPriceAtPurchase());
        dto.setQuantity(item.getQuantity());
        return dto;
    }
    
    public List<AdminOrderResponse> getAllOrdersForAdmin() {

        return orderRepository.findAll()
                .stream()
                .map(order -> {

                    AdminOrderResponse res = new AdminOrderResponse();
                    res.setOrderId(order.getId());
                    res.setCustomerEmail(order.getUser().getEmail());
                    res.setTotalAmount(order.getTotalAmount());
                    res.setStatus(order.getStatus().name());
                    res.setCreatedAt(order.getCreatedAt());

                    List<AdminOrderItemResponse> items =
                            order.getItems().stream().map(item -> {
                                AdminOrderItemResponse dto =
                                        new AdminOrderItemResponse();
                                dto.setProductName(item.getProduct().getName());
                                dto.setQuantity(item.getQuantity());
                                dto.setPrice(item.getPriceAtPurchase());
                                dto.setVendorShop(item.getVendor().getShopName());
                                return dto;
                            }).toList();

                    res.setItems(items);
                    return res;
                })
                .toList();
    }

}