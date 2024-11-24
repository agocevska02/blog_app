package com.example.blog_app.service;

import com.example.blog_app.model.Subscription;

import java.util.List;

public interface SubscriptionService {
    void addSubscription(String email);
    void removeSubscription(String email);
    List<Subscription> getAllSubscriptions();

}
