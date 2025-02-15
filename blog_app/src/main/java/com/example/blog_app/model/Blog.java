package com.example.blog_app.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
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

    public Blog(String title, String content, Category category, User user, String imageUrl, PublicImage publicImage) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.author = user;
        this.imageUrl = imageUrl;
        this.publicImage = publicImage;
        this.createdOn = LocalDateTime.now();
    }

    public void addLike(User user) {
        this.likes.add(user);
        user.getLikedBlogs().add(this);
    }

    public void removeLike(User user) {
        user.getLikedBlogs().remove(this);
        this.likes.remove(user);
    }

    public int getLikesCount() {
        return likes.size();
    }

    public boolean isLikedByUser(User user) {
        return likes.stream().anyMatch(like -> like.getId().equals(user.getId()));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Blog blog = (Blog) o;
        return Objects.equals(id, blog.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}
