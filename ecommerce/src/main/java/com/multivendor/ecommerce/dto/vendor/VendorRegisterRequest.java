package com.multivendor.ecommerce.dto.vendor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class VendorRegisterRequest {

   
    @NotBlank(message = "Shop name is required")
    private String shopName;

  

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }
}
