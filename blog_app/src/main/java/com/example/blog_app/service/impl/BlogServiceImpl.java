package com.example.blog_app.service.impl;

import com.example.blog_app.model.Blog;
import com.example.blog_app.repository.BlogRepository;
import com.example.blog_app.repository.CategoryRepository;
import com.example.blog_app.service.BlogService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;

    public BlogServiceImpl(BlogRepository blogRepository, CategoryRepository categoryRepository) {
        this.blogRepository = blogRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void addBlog(String title, String content, Long category_id, String author, String imageUrl) {
        blogRepository.save(new Blog(title, content, categoryRepository.findById(category_id).orElse(null), author, imageUrl));
    }

    @Override
    public void deleteBlog(Long id) {
        Blog blog = getBlogById(id);
        blogRepository.deleteById(id);

    }

    @Override
    public void updateBlog(Long id, String title, String content, Long category_id, String author, String imageUrl) {
        Blog blog = getBlogById(id);
        if (blog != null) {
            blog.setTitle(title);
            blog.setContent(content);
            blog.setCategory(categoryRepository.findById(category_id).orElse(null));
            blog.setAuthor(author);
            blog.setImageUrl(imageUrl);
            blog.setUpdatedOn(LocalDateTime.now());
            blogRepository.save(blog);
        }
    }

    @Override
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @Override
    public Blog getBlogById(Long id) {
        return blogRepository.findById(id).orElse(null);
    }

    @Override
    public List<Blog> getBlogsByCategoryId(Long category_id) {
        return blogRepository.findByCategoryId(category_id);
    }

    @Override
    public List<Blog> getBlogsByAuthor(String author) {
        return blogRepository.findByAuthorContainingIgnoreCase(author);
    }
}
