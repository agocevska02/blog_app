package com.example.blog_app.service.impl;

import com.example.blog_app.model.Subscription;
import com.example.blog_app.repository.SubscriptionRepository;
import com.example.blog_app.service.SubscriptionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    @Override
    public void addSubscription(String email) {
        subscriptionRepository.save(new Subscription(email));

    }

    @Override
    public void removeSubscription(String email) {
        Subscription subscription = subscriptionRepository.findByEmail(email);
        if (subscription != null) {
            subscriptionRepository.delete(subscription);
        }

    }

    @Override
    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }
}
