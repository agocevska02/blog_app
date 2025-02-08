package com.example.blog_app.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class BlogLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Blog blog;

    @ManyToOne
    private User user;
} 