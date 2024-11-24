package com.example.blog_app.service.impl;


import com.example.blog_app.model.Category;
import com.example.blog_app.repository.CategoryRepository;
import com.example.blog_app.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements  CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    @Override
    public void addCategory(String name) {
        Category category = new Category(name);
        categoryRepository.save(category);
    }

    @Override
    public Long getCategoryId(String name) {
        return categoryRepository.findByName(name).getId();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
    public Category updateCategory(Long id, String name){
        Category category = getCategoryById(id);
        if(category!=null){
            category.setName(name);
            categoryRepository.save(category);
        }
        return category;
    }

}
