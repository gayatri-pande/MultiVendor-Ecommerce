package com.multivendor.ecommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.multivendor.ecommerce.entity.Category;
import com.multivendor.ecommerce.exception.CategoryNotFoundException;
import com.multivendor.ecommerce.repository.CategoryRepository;

@Service
public class CategoryService {
	private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(String name) {
        Category category = new Category();
        category.setName(name);
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(int id) {
        return categoryRepository.findById(id)
                .orElseThrow(() ->
                        new CategoryNotFoundException("Category not found with id: " + id));
    }

}
