package com.example.blog_app.events;

import com.example.blog_app.model.Blog;
import org.springframework.context.ApplicationEvent;

public class BlogCreatedEvent extends ApplicationEvent {
    public Blog blog;
    public BlogCreatedEvent(Blog blog) {
        super(blog);
        this.blog=blog;
    }

    public Blog getBlog() {
        return blog;
    }
}
