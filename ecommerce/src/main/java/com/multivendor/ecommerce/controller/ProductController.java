package com.multivendor.ecommerce.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.multivendor.ecommerce.dto.product.ProductResponse;
import com.multivendor.ecommerce.dto.product.UpdateProductRequest;
import com.multivendor.ecommerce.entity.Product;
import com.multivendor.ecommerce.entity.User;
import com.multivendor.ecommerce.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ProductResponse addProduct(
            @RequestParam String name,
            @RequestParam double price,
            @RequestParam int stock,
            @RequestParam int categoryId,
            @RequestParam MultipartFile image
    ) {
        return productService.addProduct(
                name,
                price,
                stock,
                categoryId,
                image
        );
    }


    @GetMapping
    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }

 
    @GetMapping("/{id}")
    public ProductResponse getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

   
    @GetMapping("/my")
    public List<ProductResponse> getMyProducts() {
        return productService.getMyProducts();
    }


    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return "Product deleted successfully";
    }
    

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProductRequest request,
            Authentication authentication
    ) {
        User vendorUser = (User) authentication.getPrincipal();
        return productService.updateProduct(id, request);
    }

}
