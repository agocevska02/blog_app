package com.example.blog_app.service;

import com.example.blog_app.model.Blog;
import com.example.blog_app.model.Category;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BlogService {
    void addBlog(String title, String content, Long category_id, String author, String imageUrl);
    void deleteBlog(Long id);
    void updateBlog(Long id,String title, String content, Long category_id, String author, String imageUrl);
    List<Blog> getAllBlogs();
    Blog getBlogById(Long id);
    List<Blog> getBlogsByCategoryId(Long category_id);
    List<Blog> getBlogsByAuthor(String author);

}
