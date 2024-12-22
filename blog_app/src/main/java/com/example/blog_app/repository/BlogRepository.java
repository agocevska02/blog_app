package com.example.blog_app.repository;

import com.example.blog_app.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog,Long> {
    List<Blog> findByCategoryId(Long categoryId);
    List<Blog> findByAuthor_Id(Long authorId);
    List<Blog> findByAuthor_IdAndCategoryId(Long authorId, Long categoryId);
}
