package com.example.blog_app.web.handler;

import com.example.blog_app.model.Subscription;
import com.example.blog_app.model.dto.SubscriptionDto;
import com.example.blog_app.service.SubscriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping
    public ResponseEntity<List<Subscription>> getAllSubscriptions() {
        List<Subscription> subscriptions = subscriptionService.getAllSubscriptions();
        return ResponseEntity.ok(subscriptions);
    }

    @PostMapping
    public ResponseEntity<Subscription> addSubscription(@RequestBody SubscriptionDto subscriptionDto) {
        Subscription createdSubscription = subscriptionService.addSubscription(subscriptionDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSubscription);
    }

    @DeleteMapping
    public ResponseEntity<Void> removeSubscription(@RequestBody SubscriptionDto subscriptionDto) {
        subscriptionService.removeSubscription(subscriptionDto);
        return ResponseEntity.ok().build();
    }
}
