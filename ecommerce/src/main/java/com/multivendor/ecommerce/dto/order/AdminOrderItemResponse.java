package com.multivendor.ecommerce.dto.order;

public class AdminOrderItemResponse {
	private String productName;
    private int quantity;
    private double price;
    private String vendorShop;
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
	public String getVendorShop() {
		return vendorShop;
	}
	public void setVendorShop(String vendorShop) {
		this.vendorShop = vendorShop;
	}

}
