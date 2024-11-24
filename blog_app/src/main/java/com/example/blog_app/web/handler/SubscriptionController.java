package com.example.blog_app.web.handler;

import com.example.blog_app.service.impl.SubscriptionServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subscriptions")
public class SubscriptionController {

    private final SubscriptionServiceImpl subscriptionService;

    public SubscriptionController(SubscriptionServiceImpl subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping
    public ResponseEntity<?> getAllSubscriptions() {
        return new ResponseEntity<>(subscriptionService.getAllSubscriptions(), HttpStatus.OK);
    }
  @PostMapping
    public ResponseEntity<?> addSubscription(@RequestParam String email) {
        subscriptionService.addSubscription(email);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @DeleteMapping
    public ResponseEntity<?> removeSubscription(@RequestParam String email) {
        subscriptionService.removeSubscription(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
