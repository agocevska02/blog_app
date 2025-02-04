package com.example.blog_app.service.impl;

import com.example.blog_app.model.PublicImage;
import com.example.blog_app.service.PublicImageService;
import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.config.Configuration;
import io.imagekit.sdk.exceptions.*;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Getter
@Service
public class ImageService {
    private final ImageKit imageKit;
    private final PublicImageService publicImageService;

    public ImageService(@Value("${imagekit.private_key}") String privateKey,
                        @Value("${imagekit.public_key}") String publicKey,
                        @Value("${imagekit.url_endpoint}") String urlEndpoint, PublicImageService publicImageService) {
        this.publicImageService = publicImageService;
        this.imageKit = ImageKit.getInstance();
        Configuration config = new Configuration();
        config.setPrivateKey(privateKey);
        config.setPublicKey(publicKey);
        config.setUrlEndpoint(urlEndpoint);
        System.out.println("Using ImageKit Config:");
        System.out.println("Public Key: " + publicKey);
        System.out.println("URL Endpoint: " + urlEndpoint);

        imageKit.setConfig(config);
    }

    public PublicImage uploadImage(MultipartFile file) {
        try {
            FileCreateRequest fileCreateRequest = new FileCreateRequest(file.getBytes(), file.getOriginalFilename());

            Result result = imageKit.upload(fileCreateRequest);
            String fieldId = result.getFileId();
            String imageUrl = result.getUrl();
            PublicImage publicImage = new PublicImage(fieldId, imageUrl);
            return publicImage;

        } catch (IOException | InternalServerException | BadRequestException | ForbiddenException | UnknownException |
                 TooManyRequestsException e) {
            e.printStackTrace();
            return null;
        } catch (UnauthorizedException e) {
            throw new RuntimeException(e);
        }
    }

    public String deleteImage(String fileId) {
        try {
            imageKit.deleteFile(fileId);
            return "Image deleted successfully!";
        } catch (BadRequestException | ForbiddenException | InternalServerException | TooManyRequestsException |
                 UnknownException | UnauthorizedException e) {
            e.printStackTrace();
            return "Error deleting image: " + e.getMessage();
        }
    }

}
