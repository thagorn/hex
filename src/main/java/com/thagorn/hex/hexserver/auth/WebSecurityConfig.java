package com.thagorn.hex.hexserver.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    public static final String REACT_ORIGIN = "http://localhost:3000";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // TODO: should handle CRSF tokens at some point
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/", "/home", "/**", "/api/**").permitAll() // TODO: Overly permissive for testing
                        //.anyRequest().authenticated()
                )
                .formLogin((form) -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/api/perform_login")
                        .defaultSuccessUrl(REACT_ORIGIN + "/success") // just for testing
                        .failureUrl(REACT_ORIGIN + "/login?error=Incorrect username or password")
                        .permitAll()
                )
                .logout((logout) -> logout.permitAll());
        return http.build();
    }

    // @Bean
    // public InMemoryUserDetailsManager userDetailsService() {
    //     UserDetails user =
    //          User.withDefaultPasswordEncoder()
    //             .username("user")
    //             .password("password")
    //             .roles("USER")
    //             .build();

    //     return new InMemoryUserDetailsManager(user);
    // }
}
