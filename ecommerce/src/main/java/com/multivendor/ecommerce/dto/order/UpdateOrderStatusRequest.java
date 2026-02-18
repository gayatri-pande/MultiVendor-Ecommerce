package com.multivendor.ecommerce.dto.order;

import com.multivendor.ecommerce.enums.OrderItemStatus;

public class UpdateOrderStatusRequest {
	
	 private OrderItemStatus status;

	    public OrderItemStatus getStatus() {
	        return status;
	    }

	    public void setStatus(OrderItemStatus status) {
	        this.status = status;
	    }

}
