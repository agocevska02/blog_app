package com.example.blog_app.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
    @ManyToMany(mappedBy = "likedBlogs")
    @JsonManagedReference
    private Set<User> likes = new HashSet<>();
    
    public void addLike(User user) {
        this.likes.add(user);
        user.getLikedBlogs().add(this);
    }

    public void removeLike(User user){
        this.likes.removeIf(like -> like.getId().equals(user.getId()));
        user.getLikedBlogs().remove(this);
    }
    
    public Blog(String title, String content, Category category, User user, String imageUrl, PublicImage publicImage) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.author = user;
        this.imageUrl = imageUrl;
        this.publicImage = publicImage;
        this.createdOn = LocalDateTime.now();
    }

    public int getLikesCount() {
        return likes.size();
    }

    public boolean isLikedByUser(User user) {
        return likes.stream().anyMatch(like -> like.getId().equals(user.getId()));
    }
}
