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
        this.emailService = emailService;
    }

    @EventListener
    @Async
    public void sendEmails(BlogCreatedEvent event) {
        Blog blog = event.getBlog();
        String link = baseUrl + blog.getId();
        List<Subscription> subscriptions = subscriptionService.getAllSubscriptions();
        subscriptions.forEach(subscription -> {
            String message = "Hello, " + subscription.getEmail() + " a new blog was just published.";
            String subject = "Exciting news from Blog App";

            String content = blog.getContent();
            String previewContent = content.length() > 200 ? content.substring(0, 200) + "..." : content;

            String htmlContent = String.format("""
                            <html>
                            <body style="font-family: Arial, sans-serif; background-color: #181818; color: #ffffff; padding: 20px; text-align: center;">
                                <div style="background-color: #222222; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);">
                                    
                                    <!-- Greeting Message -->
                                    <p style="font-size: 16px; color: #cccccc; text-align: left;">
                                        Hello, %s, a new blog was just published.
                                    </p>
                                    
                                    <!-- Blog Header -->
                                    <p style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #f5a623;">
                                        %s · by %s
                                    </p>
                                    
                                    <!-- Blog Title -->
                                    <p style="font-size: 24px; font-weight: bold; margin: 10px 0; color: #ffffff;">
                                        %s
                                    </p>
                                    
                                    <!-- Blog Content Preview -->
                                    <p style="font-size: 16px; color: #cccccc; line-height: 1.6; margin-bottom: 15px; text-align: left;">
                                        %s
                                    </p>

                                    <!-- Blog Image -->
                                    <img src="%s" alt="Blog Image" style="width: 100%%; max-width: 500px; border-radius: 8px; display: block; margin: 10px auto; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
                                    
                                    <!-- Read More Button -->
                                    <a href="%s" style="display: inline-block; padding: 12px 20px; background-color: #f5a623; color: #181818; text-decoration: none; font-weight: bold; border-radius: 5px; transition: background 0.3s; margin-top: 15px;">
                                        Read More
                                    </a>
                                </div>
                            </body>
                            </html>
                            """,
                    subscription.getEmail(),
                    blog.getCategory().getName(),
                    blog.getAuthor().getFullName(),
                    blog.getTitle(),
                    previewContent,
                    blog.getPublicImage().getPublicImageUrl(),
                    link);

            EmailDetails emailDetails = new EmailDetails(subscription.getEmail(), subject, htmlContent, link);
            emailService.sendSimpleMail(emailDetails);

        });
    }
}
