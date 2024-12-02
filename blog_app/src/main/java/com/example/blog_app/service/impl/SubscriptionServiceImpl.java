package com.example.blog_app.service.impl;

import com.example.blog_app.model.Subscription;
import com.example.blog_app.model.dto.SubscriptionDto;
import com.example.blog_app.repository.SubscriptionRepository;
import com.example.blog_app.service.SubscriptionService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    @Override
    public Subscription addSubscription(@RequestBody SubscriptionDto subscriptionDto) {
        return subscriptionRepository.save(new Subscription(subscriptionDto.getEmail()));

    }

    @Override
    public void removeSubscription(@RequestBody SubscriptionDto subscriptionDto) {
        Subscription subscription = subscriptionRepository.findByEmail(subscriptionDto.getEmail());
        if (subscription != null) {
            subscriptionRepository.delete(subscription);
        }

    }

    @Override
    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }
}
