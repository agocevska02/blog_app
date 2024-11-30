package com.example.blog_app.service;

import com.example.blog_app.model.Blog;
import com.example.blog_app.model.dto.BlogDto;

import java.util.List;

public interface BlogService {
    Blog addBlog(BlogDto blogDto);
    void deleteBlog(Long id);
    Blog updateBlog(Long id, BlogDto blogDto);
    List<Blog> getAllBlogs();
    Blog getBlogById(Long id);
    List<Blog> getBlogsByCategoryId(Long categoryId);
    List<Blog> getBlogsByAuthor(String author);
}