package com.example.blog_app.repository;

import com.example.blog_app.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog,Long> {
    List<Blog> findByCategoryIdOrderByCreatedOnDesc(Long categoryId);
    List<Blog> findByAuthor_IdOrderByCreatedOnDesc(Long authorId);
    List<Blog> findByAuthor_IdAndCategoryIdOrderByCreatedOnDesc(Long authorId, Long categoryId);
    List<Blog> findAllByOrderByCreatedOnDesc();

}
