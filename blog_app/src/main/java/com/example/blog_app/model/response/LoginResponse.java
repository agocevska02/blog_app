package com.example.blog_app.model.response;

import com.example.blog_app.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String token;

    private long expiresIn;

    private Role role;

    public String getToken() {
        return token;
    }

    public LoginResponse(String token, long expiresIn, Role role) {
        this.token = token;
        this.expiresIn = expiresIn;
        this.role = role;
    }
}