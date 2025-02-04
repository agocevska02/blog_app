package com.example.blog_app.service.impl;

import com.example.blog_app.events.BlogCreatedEvent;
import com.example.blog_app.model.Blog;
import com.example.blog_app.model.PublicImage;
import com.example.blog_app.model.User;
import com.example.blog_app.model.dto.BlogDto;
import com.example.blog_app.repository.BlogRepository;
import com.example.blog_app.repository.CategoryRepository;
import com.example.blog_app.service.BlogService;
import com.example.blog_app.service.PublicImageService;
import com.example.blog_app.web.handler.FilesStorageController;
import org.springframework.context.ApplicationEventPublisher;
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

    private final ApplicationEventPublisher eventPublisher;

    private final ImageService imageService;
    private final PublicImageService publicImageService;

    public BlogServiceImpl(BlogRepository blogRepository,
                           CategoryRepository categoryRepository,
                           FilesStorageController filesStorageController,
                           FilesStorageServiceImpl filesStorageServiceImpl,
                           ApplicationEventPublisher eventPublisher, ImageService imageService, PublicImageService publicImageService) {
        this.blogRepository = blogRepository;
        this.categoryRepository = categoryRepository;
        this.filesStorageController = filesStorageController;
        this.filesStorageServiceImpl = filesStorageServiceImpl;
        this.eventPublisher = eventPublisher;
        this.imageService = imageService;
        this.publicImageService = publicImageService;
    }


    @Override
    public Blog addBlog(BlogDto blogDto, User user) {
        String imageUrl = ((Map<String, String>) filesStorageController.uploadFile(blogDto.getFile()).getBody()).get("fileUri");
        PublicImage publicImage = imageService.uploadImage(blogDto.getFile());
        publicImage=publicImageService.addPublicImage(publicImage.getFieldId(), publicImage.getPublicImageUrl());
        Blog blog = new Blog(
                blogDto.getTitle(),
                blogDto.getContent(),
                categoryRepository.findById(blogDto.getCategoryId()).orElse(null),
                user,
                imageUrl,
                publicImage
        );
        blog.setCreatedOn(LocalDateTime.now());
        blogRepository.save(blog);

        eventPublisher.publishEvent(new BlogCreatedEvent(blog));
        return blog;
    }

    @Override
    public void deleteBlog(Long id) {
        Blog blog = blogRepository.findById(id).orElse(null);
        if (blog != null) {
            String previousImageUrl = blog.getImageUrl().split("/")[4];
            filesStorageServiceImpl.deletePhotoByName(previousImageUrl);
            imageService.deleteImage(blog.getPublicImage().getFieldId());
            Long publicImageId = blog.getPublicImage().getId();
            blogRepository.deleteById(id);
            publicImageService.deletePublicImage(publicImageId);
        }
    }

    @Override
    public Blog updateBlog(Long id, BlogDto blogDto) {
        Blog blog = blogRepository.findById(id).orElse(null);
        if (blog != null) {
            String previousImageUrl = blog.getImageUrl().split("/")[4];
            if (blogDto.getFile() != null) {
                filesStorageServiceImpl.deletePhotoByName(previousImageUrl);
                imageService.deleteImage(blog.getPublicImage().getFieldId());
            }
            blog.setTitle(blogDto.getTitle());
            blog.setContent(blogDto.getContent());
            blog.setCategory(categoryRepository.findById(blogDto.getCategoryId()).orElse(null));
            blog.setUpdatedOn(LocalDateTime.now());
            if (blogDto.getFile() != null) {
                String imageUrl = ((Map<String, String>) filesStorageController.uploadFile(blogDto.getFile()).getBody()).get("fileUri");
                blog.setImageUrl(imageUrl);
                PublicImage newPublicImage = imageService.uploadImage(blogDto.getFile());
                PublicImage publicImage= blog.getPublicImage();
                publicImageService.updatePublicImage(publicImage.getId(), newPublicImage.getFieldId(), newPublicImage.getPublicImageUrl());
                blog.setPublicImage(publicImage);
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
