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
    @Column(columnDefinition = "TEXT")
    private String content;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne
    @JoinColumn(name = "users_id")
    private User author;
    private String imageUrl;
    @OneToOne
    @JoinColumn(name = "public_image_id")
    private PublicImage publicImage;
    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;

    public Blog(String title, String content, Category category, User user, String imageUrl, PublicImage publicImage) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.author = user;
        this.imageUrl = imageUrl;
        this.publicImage = publicImage;
        this.createdOn = LocalDateTime.now();
    }
}
