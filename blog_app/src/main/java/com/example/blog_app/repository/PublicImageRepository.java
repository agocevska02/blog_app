package com.example.blog_app.repository;

import com.example.blog_app.model.PublicImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Locale;
import java.util.Optional;

@Repository
public interface PublicImageRepository extends JpaRepository<PublicImage, Long> {
    PublicImage findByFieldId(String fieldId);
    Optional<PublicImage> findById(Long id);

}
