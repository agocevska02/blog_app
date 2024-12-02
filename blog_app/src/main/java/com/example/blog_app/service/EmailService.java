package com.example.blog_app.service;

import com.example.blog_app.model.EmailDetails;

public interface EmailService {
    String sendSimpleMail(EmailDetails details);

    String sendMailWithAttachment(EmailDetails details);
}