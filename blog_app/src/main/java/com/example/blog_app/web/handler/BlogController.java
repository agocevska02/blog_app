package com.example.blog_app.web.handler;

import com.example.blog_app.model.Blog;
import com.example.blog_app.model.User;
import com.example.blog_app.model.dto.BlogDto;
import com.example.blog_app.service.BlogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    private final BlogService blogService;
    private final UserController userController;
    public BlogController(BlogService blogService, UserController userController) {
        this.blogService = blogService;
        this.userController = userController;
    }

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @PostMapping(value="/add", consumes = "multipart/form-data")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Blog> addBlog(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("file") MultipartFile file) {

        BlogDto blogDto = new BlogDto();
        blogDto.setTitle(title);
        blogDto.setContent(content);
        blogDto.setCategoryId(categoryId);
        blogDto.setFile(file);

        ResponseEntity<User> user = userController.authenticatedUser();
        Blog createdBlog = this.blogService.addBlog(blogDto, user.getBody());

        return ResponseEntity.status(HttpStatus.CREATED).body(createdBlog);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id,
                                           @RequestParam("title") String title,
                                           @RequestParam("content") String content,
                                           @RequestParam("categoryId") Long categoryId,
                                           @RequestParam(value = "file", required = false) MultipartFile file
                                           ) {
        BlogDto blogDto = new BlogDto();
        blogDto.setTitle(title);
        blogDto.setContent(content);
        blogDto.setCategoryId(categoryId);
        if(file!=null){
            blogDto.setFile(file);
        }

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

    @GetMapping("/myBlogs")
    public ResponseEntity<List<Blog>> getMyBlogs() {
        User user = userController.authenticatedUser().getBody();
        List<Blog> blogs = blogService.getBlogsByAuthor(user);
        return ResponseEntity.ok(blogs);
    }
    @GetMapping("/myBlogs/{category_id}")
    public ResponseEntity<List<Blog>> getMyBlogsByCategoryId(@PathVariable Long category_id) {
        User user = userController.authenticatedUser().getBody();
        List<Blog> blogs = blogService.getBlogsByAuthorAndCategory(user, category_id);
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/like/{id}")
    public ResponseEntity<Blog> likeBlog(@PathVariable Long id) {
        Blog blog = blogService.likeBlog(id);
        return ResponseEntity.ok(blog);
    }
    @GetMapping("/dislike/{id}")
    public ResponseEntity<Blog> dislikeBlog(@PathVariable Long id) {
        Blog blog = blogService.dislikeBlog(id);
        return ResponseEntity.ok(blog);
    }
}