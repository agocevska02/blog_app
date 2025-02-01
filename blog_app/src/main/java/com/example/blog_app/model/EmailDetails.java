package com.example.blog_app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailDetails {
    private String recipient;
    private String subject;
    private String message;
    private String attachment;
    private String link;

    public EmailDetails(String recipient,
                        String subject,
                        String message,
                        String link) {
        this.recipient = recipient;
        this.subject = subject;
        this.message = message;
        this.link = link;
    }
}