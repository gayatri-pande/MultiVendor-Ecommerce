package com.multivendor.ecommerce.dto.order;

import java.time.LocalDateTime;

import com.multivendor.ecommerce.enums.OrderItemStatus;

public class VendorOrderItemResponse {
	
	 private Long orderItemId;
	    private Long orderId;
	    private String productName;
	    private int quantity;
	    private double price;
	    private OrderItemStatus status;
	    private LocalDateTime orderedAt;
		public Long getOrderItemId() {
			return orderItemId;
		}
		public void setOrderItemId(Long orderItemId) {
			this.orderItemId = orderItemId;
		}
		public Long getOrderId() {
			return orderId;
		}
		public void setOrderId(Long orderId) {
			this.orderId = orderId;
		}
		public String getProductName() {
			return productName;
		}
		public void setProductName(String productName) {
			this.productName = productName;
		}
		public int getQuantity() {
			return quantity;
		}
		public void setQuantity(int quantity) {
			this.quantity = quantity;
		}
		public double getPrice() {
			return price;
		}
		public void setPrice(double price) {
			this.price = price;
		}
		public OrderItemStatus getStatus() {
			return status;
		}
		public void setStatus(OrderItemStatus status) {
			this.status = status;
		}
		public LocalDateTime getOrderedAt() {
			return orderedAt;
		}
		public void setOrderedAt(LocalDateTime orderedAt) {
			this.orderedAt = orderedAt;
		}

}
