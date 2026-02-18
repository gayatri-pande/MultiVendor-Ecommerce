package com.multivendor.ecommerce.dto.vendor;

public class VendorMeResponse {

    private boolean approved;
    private String shopName;

    public VendorMeResponse(boolean approved, String shopName) {
        this.approved = approved;
        this.shopName = shopName;
    }

    public boolean isApproved() {
        return approved;
    }

    public String getShopName() {
        return shopName;
    }
}
