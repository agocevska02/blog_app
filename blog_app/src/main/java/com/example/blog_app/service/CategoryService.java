package com.example.blog_app.service;

import com.example.blog_app.model.Category;

import java.util.List;

public interface CategoryService {

    void addCategory(String  name);
    Long getCategoryId(String name);
    Category getCategoryById(Long id);
    List<Category> getAllCategories();
    Category getCategoryByName(String name);
    void deleteCategory(Long id);
    Category updateCategory(Long id, String name);
}
