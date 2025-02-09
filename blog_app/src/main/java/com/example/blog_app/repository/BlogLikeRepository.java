package com.example.blog_app.repository;

import com.example.blog_app.model.BlogLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogLikeRepository extends JpaRepository<BlogLike, Long> {
}
