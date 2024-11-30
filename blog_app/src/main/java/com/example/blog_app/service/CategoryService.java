package com.example.blog_app.service;

import com.example.blog_app.model.Category;
import com.example.blog_app.model.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    Category addCategory(CategoryDto categoryDto);
    void deleteCategory(Long id);
    Category updateCategory(Long id, CategoryDto categoryDto);
    List<Category> getAllCategories();
    Category getCategoryById(Long id);
    Category getCategoryByName(String name);
    Long getCategoryIdByName(String name);
}
