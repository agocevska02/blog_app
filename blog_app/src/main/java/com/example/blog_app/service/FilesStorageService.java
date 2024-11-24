package com.example.blog_app.service;

import com.example.blog_app.model.FileStatus;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FilesStorageService {


    List<String> getFilesList();


    FileStatus uploadFile(MultipartFile multipartFile);


    Resource downloadFile(String fileName);


}
