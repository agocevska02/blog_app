package com.example.blog_app.web.handler;

import com.example.blog_app.service.impl.FilesStorageServiceImpl;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FilesStorageController {

    private final FilesStorageServiceImpl filesStorageService;

    public FilesStorageController(FilesStorageServiceImpl fs) {
        super();
        this.filesStorageService = fs;
    }

    @GetMapping
    public ResponseEntity<?> getFilesList() {
        return new ResponseEntity<>(filesStorageService.getFilesList(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestBody MultipartFile file) {
        String savedFileName = filesStorageService.uploadAndGetFileName(file);

        if (savedFileName == null) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }

        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(savedFileName)
                .toUriString();


        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("fileUri", fileUri));
    }

    @GetMapping(value = "/{name}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<?> downloadFile(@PathVariable(value = "name") String fileName) {
        Resource file = filesStorageService.downloadFile(fileName);
        if (file == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).body(file);
        }
    }


}
