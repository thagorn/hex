package com.thagorn.hex.hexserver.auth;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserPrincipal implements UserDetails {
    private User user;

    public CustomUserPrincipal(User user) {
        this.user = user;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public String getUsername() {
        return this.user.username;
    }

    @Override
    public String getPassword() {
        return this.user.password;
    }
}