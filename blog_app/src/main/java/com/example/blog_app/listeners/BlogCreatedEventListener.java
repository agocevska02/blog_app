package com.example.blog_app.listeners;

import com.example.blog_app.events.BlogCreatedEvent;
import com.example.blog_app.model.Blog;
import com.example.blog_app.model.EmailDetails;
import com.example.blog_app.model.Subscription;
import com.example.blog_app.service.EmailService;
import com.example.blog_app.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BlogCreatedEventListener {
    public SubscriptionService subscriptionService;
    public EmailService emailService;

    @Value("${app.base-url}")
    private String baseUrl;

    public BlogCreatedEventListener(SubscriptionService subscriptionService, EmailService emailService) {
        this.subscriptionService = subscriptionService;
        this.emailService=emailService;
    }

    @EventListener
    @Async
    public void sendEmails(BlogCreatedEvent event) {
        Blog blog = event.getBlog();
        String link = baseUrl + blog.getId();
        List<Subscription> subscriptions = subscriptionService.getAllSubscriptions();
        subscriptions.forEach(subscription -> {
            String message = "Hello, " + subscription.getEmail() + " a new blog was just published. Take a look at it ";
            String subject = "Exciting news from Blog App";
            EmailDetails emailDetails = new EmailDetails(subscription.getEmail(), subject, message, "", link);
            emailService.sendSimpleMail(emailDetails);
        });
    }
}
