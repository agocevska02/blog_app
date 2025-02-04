package com.example.blog_app.service.impl;

import com.example.blog_app.model.Blog;
import com.example.blog_app.model.User;
import com.example.blog_app.model.dto.BlogDto;
import com.example.blog_app.repository.BlogRepository;
import com.example.blog_app.repository.CategoryRepository;
import com.example.blog_app.service.BlogService;
import com.example.blog_app.web.handler.FilesStorageController;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;
    private final FilesStorageController filesStorageController;
    private final FilesStorageServiceImpl filesStorageServiceImpl;

    public BlogServiceImpl(BlogRepository blogRepository, CategoryRepository categoryRepository, FilesStorageController filesStorageController, FilesStorageServiceImpl filesStorageServiceImpl) {
        this.blogRepository = blogRepository;
        this.categoryRepository = categoryRepository;
        this.filesStorageController = filesStorageController;
        this.filesStorageServiceImpl = filesStorageServiceImpl;
    }


    @Override
    public Blog addBlog(BlogDto blogDto, User user) {
        String imageUrl = ((Map<String, String>) filesStorageController.uploadFile(blogDto.getFile()).getBody()).get("fileUri");
        Blog blog = new Blog(
                blogDto.getTitle(),
                blogDto.getContent(),
                categoryRepository.findById(blogDto.getCategoryId()).orElse(null),
                user,
                imageUrl
        );
        blog.setCreatedOn(LocalDateTime.now());
        blogRepository.save(blog);
        return blog;
    }
    @Override
    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }

    @Override
    public Blog updateBlog(Long id, BlogDto blogDto) {
        Blog blog = blogRepository.findById(id).orElse(null);
        if (blog != null) {
           String previousImageUrl = blog.getImageUrl().split("/")[4];
            if(blogDto.getFile() != null) {
                filesStorageServiceImpl.deletePhotoByName(previousImageUrl);
            }
            blog.setTitle(blogDto.getTitle());
            blog.setContent(blogDto.getContent());
            blog.setCategory(categoryRepository.findById(blogDto.getCategoryId()).orElse(null));
            blog.setUpdatedOn(LocalDateTime.now());
            if(blogDto.getFile() != null) {
                String imageUrl = ((Map<String, String>) filesStorageController.uploadFile(blogDto.getFile()).getBody()).get("fileUri");
                blog.setImageUrl(imageUrl);
            }
            blogRepository.save(blog);
        }
        return blog;
    }

    @Override
    public List<Blog> getAllBlogs() {
        return blogRepository.findAllByOrderByCreatedOnDesc();
    }

    @Override
    public Blog getBlogById(Long id) {
        return blogRepository.findById(id).orElse(null);
    }

    @Override
    public List<Blog> getBlogsByCategoryId(Long categoryId) {
        return blogRepository.findByCategoryIdOrderByCreatedOnDesc(categoryId);
    }

    @Override
    public List<Blog> getBlogsByAuthor(User author) {
        return blogRepository.findByAuthor_IdOrderByCreatedOnDesc(Long.valueOf(author.getId()));
    }

    @Override
    public List<Blog> getBlogsByAuthorAndCategory(User author, Long categoryId) {
        return blogRepository.findByAuthor_IdAndCategoryIdOrderByCreatedOnDesc(Long.valueOf(author.getId()), categoryId);
    }
    public Blog likeBlog(Long id){
        Blog blog = getBlogById(id);
        blog.setLikes(blog.getLikes()+1);
        blogRepository.save(blog);
        return blog;
    }
    public Blog dislikeBlog(Long id){
        Blog blog = getBlogById(id);
        blog.setLikes(blog.getLikes()-1);
        blogRepository.save(blog);
        return blog;
    }
}
