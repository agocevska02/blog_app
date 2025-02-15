package com.example.blog_app.service.impl;

import com.example.blog_app.model.Blog;
import com.example.blog_app.model.BlogLike;
import com.example.blog_app.model.User;
import com.example.blog_app.repository.BlogLikeRepository;
import com.example.blog_app.service.BlogLikeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogLikeServiceImpl implements BlogLikeService {

    final BlogLikeRepository blogLikeRepository;

    public BlogLikeServiceImpl(BlogLikeRepository blogLikeRepository) {
        this.blogLikeRepository = blogLikeRepository;
    }

    @Override
    public List<BlogLike> getBlogLikeByUser(User user) {
        return blogLikeRepository.getBlogLikeByUser(user);
    }

    @Override
    public Optional<BlogLike> getBlogLikeByBlog(Blog blog) {
        return blogLikeRepository.getBlogLikeByBlog(blog);
    }

    @Override
    public void removeBlogLikeByBlog(Blog blog) {
        blogLikeRepository.removeBlogLikeByBlog(blog);
    }

    @Override
    public void addBlogLike(BlogLike blogLike) {
        blogLikeRepository.save(blogLike);
    }
}
