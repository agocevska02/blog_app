package com.example.blog_app.web.handler;

import com.example.blog_app.model.Blog;
import com.example.blog_app.model.dto.BlogDto;
import com.example.blog_app.service.BlogService;
import com.example.blog_app.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @PostMapping("/add")
    public ResponseEntity<Blog> addBlog(@RequestBody BlogDto blogDto) {
        Blog createdBlog = this.blogService.addBlog(blogDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBlog);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody BlogDto blogDto) {
        Blog updatedBlog = blogService.updateBlog(id, blogDto);
        return ResponseEntity.ok(updatedBlog);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }

    @GetMapping("/category/{category_id}")
    public ResponseEntity<List<Blog>> getBlogsByCategoryId(@PathVariable Long category_id) {
        List<Blog> blogs = blogService.getBlogsByCategoryId(category_id);
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/author/{author}")
    public ResponseEntity<List<Blog>> getBlogsByAuthor(@PathVariable String author) {
        List<Blog> blogs = blogService.getBlogsByAuthor(author);
        return ResponseEntity.ok(blogs);
    }
}