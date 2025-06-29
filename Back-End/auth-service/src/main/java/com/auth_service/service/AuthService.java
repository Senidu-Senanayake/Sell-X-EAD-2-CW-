package com.auth_service.service;

import com.auth_service.config.JwtUtil;
import com.auth_service.data.LoginRequest;
import com.auth_service.data.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private JwtUtil jwtUtil;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String userServiceUrl = "http://localhost:8081/api/users/email/";

    public LoginResponse login(LoginRequest request) {
        // 1. Call user-service to get user by email
        String url = userServiceUrl + request.getEmail();
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null)
            throw new RuntimeException("User not found");

        Map<String, Object> user = response.getBody();



        // 2. Check password (plain for now — hash in real app)
        if (!request.getPassword().equals(user.get("password")))
            throw new RuntimeException("Invalid credentials");

        // 3. Generate JWT
        String role = user.get("role").toString();
        String token = jwtUtil.generateToken(request.getEmail(), role);

        return new LoginResponse(token, role);
    }
}
