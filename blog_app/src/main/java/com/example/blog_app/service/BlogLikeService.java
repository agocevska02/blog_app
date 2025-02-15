package com.example.blog_app.service;

import com.example.blog_app.model.Blog;
import com.example.blog_app.model.BlogLike;
import com.example.blog_app.model.User;

import java.util.List;
import java.util.Optional;

public interface BlogLikeService {
    List<BlogLike> getBlogLikeByUser(User user);

    Optional<BlogLike> getBlogLikeByBlog(Blog blog);

    void removeBlogLikeByBlog(Blog blog);
    void addBlogLike(BlogLike blogLike);
}
