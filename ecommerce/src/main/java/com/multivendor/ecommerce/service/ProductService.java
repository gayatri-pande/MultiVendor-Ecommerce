package com.multivendor.ecommerce.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.multivendor.ecommerce.dto.product.ProductResponse;
import com.multivendor.ecommerce.dto.product.UpdateProductRequest;
import com.multivendor.ecommerce.entity.Category;
import com.multivendor.ecommerce.entity.Product;
import com.multivendor.ecommerce.entity.User;
import com.multivendor.ecommerce.entity.Vendor;
import com.multivendor.ecommerce.exception.ProductNotFoundException;
import com.multivendor.ecommerce.exception.VendorNotApprovedException;
import com.multivendor.ecommerce.repository.CategoryRepository;
import com.multivendor.ecommerce.repository.ProductRepository;
import com.multivendor.ecommerce.repository.VendorRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final VendorRepository vendorRepository;

    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository,
                          VendorRepository vendorRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.vendorRepository = vendorRepository;
    }

    // ================= ADD PRODUCT (IMAGE UPLOAD) =================
    public ProductResponse addProduct(
            String name,
            double price,
            int stock,
            int categoryId,
            MultipartFile image
    ) {

        Vendor vendor = getLoggedInVendor();

        if (!vendor.isApproved()) {
            throw new VendorNotApprovedException("Vendor not approved");
        }

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));


        String uploadDir = "uploads/products/";
        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();

        try {
            Path filePath = Paths.get(uploadDir, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, image.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image");
        }

        String imageUrl = "/images/products/" + fileName;

 
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setStock(stock);
        product.setCategory(category);
        product.setVendor(vendor);
        product.setImageUrl(imageUrl);

        return mapToResponse(productRepository.save(product));
    }

   
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id: " + id));
        return mapToResponse(product);
    }

  
    public List<ProductResponse> getMyProducts() {

        Vendor vendor = getLoggedInVendor();

        if (!vendor.isApproved()) {
            throw new VendorNotApprovedException("Vendor not approved");
        }

        return productRepository.findByVendor(vendor)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public void deleteProductById(Long productId) {

        Vendor vendor = getLoggedInVendor();

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ProductNotFoundException("Product not found"));
        if (product.getVendor().getId() != vendor.getId()) {
            throw new RuntimeException("You are not allowed to delete this product");
        }


        productRepository.delete(product);
    }


    private Vendor getLoggedInVendor() {

        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return vendorRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("User is not a vendor"));
    }

    private ProductResponse mapToResponse(Product product) {

        ProductResponse dto = new ProductResponse();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setImageUrl(product.getImageUrl());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());

        dto.setVendorId(product.getVendor().getId());
        dto.setShopName(product.getVendor().getShopName());

        dto.setCategoryId(product.getCategory().getId());
        dto.setCategoryName(product.getCategory().getName());

        return dto;
    }
    
    @Transactional
    public Product updateProduct(
            Long productId,
            UpdateProductRequest request
    ) {
        
        Vendor vendor = getLoggedInVendor();

        if (!vendor.isApproved()) {
            throw new VendorNotApprovedException("Vendor not approved");
        }

        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        
        if (!product.getVendor().getId().equals(vendor.getId())) {
            throw new RuntimeException("You are not allowed to edit this product");
        }

        
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(category);

        return productRepository.save(product);
    }


}
