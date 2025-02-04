package com.example.blog_app.service;

import com.example.blog_app.model.PublicImage;


public interface PublicImageService {
    PublicImage addPublicImage(String fieldId, String publicUrl);
    PublicImage getByFieldId(String fieldId);
    void deletePublicImage(Long id);
    void updatePublicImage(Long id, String fieldId, String publicUrl);
}
