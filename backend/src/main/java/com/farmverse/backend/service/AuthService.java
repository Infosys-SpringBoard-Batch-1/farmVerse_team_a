package com.farmverse.backend.service;
import com.farmverse.backend.dto.AuthResponse;
import com.farmverse.backend.dto.LoginRequest;
import com.farmverse.backend.dto.RegisterRequest;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.enums.Role;
import com.farmverse.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.FARMER); // default role for public self-registration
        userRepository.save(user);
        String token = jwtService.generateToken(user.getUsername(), user.getRole().name());
        return new AuthResponse(token, user.getUsername(), user.getEmail(), user.getRole().name());
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }
        String token = jwtService.generateToken(user.getUsername(), user.getRole().name());

        return new AuthResponse(token, user.getUsername(), user.getEmail(), user.getRole().name());
    }
}