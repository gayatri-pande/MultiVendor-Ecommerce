package com.multivendor.ecommerce.dto.order;

import java.util.List;

import com.multivendor.ecommerce.enums.OrderItemStatus;

public class OrderResponse {
	
	private Long orderId;
	private double totalAmount;
	private String status;
	private List<OrderItemResponse> items;
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
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
	public List<OrderItemResponse> getItems() {
		return items;
	}
	public void setItems(List<OrderItemResponse> items) {
		this.items = items;
	}
	

}
