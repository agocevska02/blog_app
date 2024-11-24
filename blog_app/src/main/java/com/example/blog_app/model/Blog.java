package com.example.blog_app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    // zasega vaka ponatamu ke smenime
    private String author;
    private String imageUrl;
    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;

    public Blog(String title, String content, Category category, String author, String imageUrl) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.author = author;
        this.imageUrl = imageUrl;
        this.createdOn = LocalDateTime.now();
    }
}
