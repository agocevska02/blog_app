package com.example.blog_app.service;

import com.example.blog_app.model.Subscription;
import com.example.blog_app.model.dto.SubscriptionDto;

import java.util.List;

public interface SubscriptionService {
    Subscription addSubscription(SubscriptionDto subscriptionDto);
    void removeSubscription(SubscriptionDto subscriptionDto);
    List<Subscription> getAllSubscriptions();

}
