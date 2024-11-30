package com.example.blog_app.service.impl;

import com.example.blog_app.model.Category;
import com.example.blog_app.model.dto.CategoryDto;
import com.example.blog_app.repository.CategoryRepository;
import com.example.blog_app.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category addCategory(CategoryDto categoryDto) {
        Category category = new Category(categoryDto.getName());
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Category updateCategory(Long id, CategoryDto categoryDto) {
        Category category = getCategoryById(id);
        if (category != null) {
            category.setName(categoryDto.getName());
            categoryRepository.save(category);
        }
        return category;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    public Long getCategoryIdByName(String name) {
        Category category = categoryRepository.findByName(name);
        return category != null ? category.getId() : null;
    }
}
