package com.example.blog_app.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogDto {
    private String title;
    private String content;
    private Long categoryId;
    private String author;
    private String imageUrl;
    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;
}