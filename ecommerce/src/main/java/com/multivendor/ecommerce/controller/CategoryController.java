package com.multivendor.ecommerce.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.multivendor.ecommerce.entity.Category;
import com.multivendor.ecommerce.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
	
	 private final CategoryService categoryService;

	    public CategoryController(CategoryService categoryService) {
	        this.categoryService = categoryService;
	    }

	  
	    @PostMapping("/create")
	    public Category createCategory(@RequestParam String name) {
	        return categoryService.createCategory(name);
	    }

	    
	    @GetMapping
	    public List<Category> getAllCategories() {
	        return categoryService.getAllCategories();
	    }

}
