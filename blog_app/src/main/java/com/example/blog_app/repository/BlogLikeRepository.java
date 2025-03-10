package com.example.blog_app.repository;

import com.example.blog_app.model.Blog;
import com.example.blog_app.model.BlogLike;
import com.example.blog_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlogLikeRepository extends JpaRepository<BlogLike, Long> {
    List<BlogLike> getBlogLikeByUser(User user);
    Optional<BlogLike> getBlogLikeByBlog(Blog blog);
    void removeBlogLikeByBlog(Blog blog);
}
