package com.example.blog_app.web.handler;

import com.example.blog_app.service.impl.BlogServiceImpl;
import com.example.blog_app.service.impl.CategoryServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    private final BlogServiceImpl blogService;
    private final CategoryServiceImpl categoryService;
    private final FilesStorageController filesStorageController;

    public BlogController(BlogServiceImpl blogService, CategoryServiceImpl categoryService, FilesStorageController filesStorageController) {
        this.blogService = blogService;
        this.categoryService = categoryService;
        this.filesStorageController = filesStorageController;
    }

    @GetMapping
    public ResponseEntity<?> getAllBlogs() {
        return new ResponseEntity<>(blogService.getAllBlogs(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addBlog(@RequestParam String title,@RequestParam  String content, @RequestParam Long category_id, @RequestParam String author,@RequestParam  MultipartFile file) {
        ResponseEntity<?> response = filesStorageController.uploadFile(file);
        Map<String, String> responseBody = (Map<String, String>) response.getBody();
        String imageUrl = responseBody.get("fileUri");
        blogService.addBlog(title, content, category_id, author, imageUrl);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable Long id, @RequestParam String title, @RequestParam String content, @RequestParam Long category_id, @RequestParam String author, @RequestParam MultipartFile file) {
        ResponseEntity<?> response = filesStorageController.uploadFile(file);
        Map<String, String> responseBody = (Map<String, String>) response.getBody();
        String imageUrl = responseBody.get("fileUri");
        blogService.updateBlog(id, title, content, category_id, author, imageUrl);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable Long id) {
        return new ResponseEntity<>(blogService.getBlogById(id), HttpStatus.OK);
    }
    @GetMapping("/category/{category_id}")
    public ResponseEntity<?> getBlogsByCategoryId(@PathVariable Long category_id) {
        return new ResponseEntity<>(blogService.getBlogsByCategoryId(category_id), HttpStatus.OK);
    }
    @GetMapping("/author/{author}")
    public ResponseEntity<?> getBlogsByAuthor(@PathVariable String author) {
        return new ResponseEntity<>(blogService.getBlogsByAuthor(author), HttpStatus.OK);
    }

}
