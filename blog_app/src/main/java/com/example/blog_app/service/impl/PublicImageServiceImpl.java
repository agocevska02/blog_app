package com.example.blog_app.service.impl;

import com.example.blog_app.model.PublicImage;
import com.example.blog_app.repository.PublicImageRepository;
import com.example.blog_app.service.PublicImageService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PublicImageServiceImpl implements PublicImageService {
    private final PublicImageRepository publicImageRepository;

    public PublicImageServiceImpl(PublicImageRepository publicImageRepository) {
        this.publicImageRepository = publicImageRepository;
    }

    @Override
    public PublicImage addPublicImage(String fieldId, String publicUrl) {
        PublicImage publicImage = new PublicImage(fieldId, publicUrl);
        return publicImageRepository.save(publicImage);
    }

    @Override
    public PublicImage getByFieldId(String fieldId) {
        return publicImageRepository.findByFieldId(fieldId);
    }

    @Override
    public void deletePublicImage(Long id) {
        publicImageRepository.findById(id).ifPresent(publicImageRepository::delete);
    }

    @Override
    public void updatePublicImage(Long id, String fieldId, String publicUrl) {
        PublicImage publicImage = publicImageRepository.findById(id).orElse(null);
        if (publicImage != null) {
            publicImage.setPublicImageUrl(publicUrl);
            publicImage.setFieldId(fieldId);
            publicImageRepository.save(publicImage);
        }

    }
}
