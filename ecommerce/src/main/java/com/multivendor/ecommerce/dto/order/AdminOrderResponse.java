package com.multivendor.ecommerce.dto.order;

import java.time.LocalDateTime;
import java.util.List;

public class AdminOrderResponse {
	 private Long orderId;
	    private String customerEmail;
	    private double totalAmount;
	    private String status;
	    private LocalDateTime createdAt;
	    private List<AdminOrderItemResponse> items;
		public Long getOrderId() {
			return orderId;
		}
		public void setOrderId(Long orderId) {
			this.orderId = orderId;
		}
		public String getCustomerEmail() {
			return customerEmail;
		}
		public void setCustomerEmail(String customerEmail) {
			this.customerEmail = customerEmail;
		}
		public double getTotalAmount() {
			return totalAmount;
		}
		public void setTotalAmount(double totalAmount) {
			this.totalAmount = totalAmount;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public LocalDateTime getCreatedAt() {
			return createdAt;
		}
		public void setCreatedAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
		}
		public List<AdminOrderItemResponse> getItems() {
			return items;
		}
		public void setItems(List<AdminOrderItemResponse> items) {
			this.items = items;
		}

}
