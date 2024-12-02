package com.example.blog_app.service.impl;

import com.example.blog_app.model.FileStatus;
import com.example.blog_app.service.FilesStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class FilesStorageServiceImpl implements FilesStorageService {

    private static final Logger logger = LoggerFactory.getLogger(FilesStorageServiceImpl.class);

    @Value("${basePath}")
    private String basePath;

    @Override
    public List<String> getFilesList() {
        File dir = new File(basePath);
        File[] files = dir.listFiles();
        return files != null
                ? Stream.of(files).map(File::getName).collect(Collectors.toList())
                : List.of();
    }

    public String uploadAndGetFileName(MultipartFile multipartFile) {
        if (multipartFile == null || multipartFile.isEmpty()) {
            return null;
        }

        try {
            String mimeType = multipartFile.getContentType();
            if (!mimeType.startsWith("image/")) {
                return null;
            }

            String renamedFile = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();
            Path targetPath = Paths.get(basePath).resolve(renamedFile).normalize();

            if (Files.exists(targetPath)) {
                return renamedFile; // File already exists, return the name
            }

            Files.copy(multipartFile.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return renamedFile;

        } catch (IOException e) {
            logger.error("Failed to upload file", e);
            return null;
        }
    }

    @Override
    public FileStatus uploadFile(MultipartFile multipartFile) {
        if (multipartFile == null || multipartFile.isEmpty()) {
            return FileStatus.FAILED;
        }

        try {
            String mimeType = multipartFile.getContentType();
            if (!mimeType.startsWith("image/")) {
                return FileStatus.FAILED;
            }

            String renamedFile = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();
            Path targetPath = Paths.get(basePath).resolve(renamedFile).normalize();

            if (Files.exists(targetPath)) {
                return FileStatus.EXIST;
            }

            Files.copy(multipartFile.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return FileStatus.CREATED;

        } catch (IOException e) {
            logger.error("Failed to upload file", e);
            return FileStatus.FAILED;
        }
    }

    @Override
    public Resource downloadFile(String fileName) {
        File dir = new File(basePath + fileName);
        try {
            if (dir.exists()) {
                return new UrlResource(dir.toURI());
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            logger.error("Failed to download file", e);
        }
        return null;
    }

}