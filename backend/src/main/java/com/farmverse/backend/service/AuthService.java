package com.farmverse.backend.service;

import java.time.LocalDateTime;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.farmverse.backend.dto.AuthResponse;
import com.farmverse.backend.dto.ForgotPasswordRequest;
import com.farmverse.backend.dto.LoginRequest;
import com.farmverse.backend.dto.RegisterRequest;
import com.farmverse.backend.dto.ResetPasswordRequest;

import com.farmverse.backend.entity.User;
import com.farmverse.backend.enums.Role;

import com.farmverse.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Random;

import com.farmverse.backend.entity.PasswordResetOtp;
import com.farmverse.backend.entity.PasswordResetToken;
import com.farmverse.backend.repository.PasswordResetOtpRepository;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final PasswordResetOtpRepository passwordResetOtpRepository;
    private final EmailService emailService;

    /**
     * Farmer Registration
     */
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername().trim())) {
            throw new IllegalArgumentException("Username already taken.");
        }

        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new IllegalArgumentException("Email already registered.");
        }

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setUsername(request.getUsername().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.FARMER);

        userRepository.save(user);

        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole().name()
        );

        return new AuthResponse(
                token,
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    /**
     * Login
     */
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new IllegalArgumentException("Invalid username or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password.");
        }

        if (!user.getRole().name().equalsIgnoreCase(request.getRole())) {
            throw new IllegalArgumentException(
                    "Selected role does not match this account."
            );
        }

        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole().name()
        );

        return new AuthResponse(
                token,
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    /**
     * Forgot Password
     */
    /**
 * Forgot Password - Send OTP
 */
public String forgotPassword(ForgotPasswordRequest request) {

    User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
            .orElseThrow(() ->
                    new IllegalArgumentException("No account found with this email."));

    passwordResetOtpRepository.findByUserId(user.getId())
            .ifPresent(passwordResetOtpRepository::delete);

    String otp = String.format("%06d", new Random().nextInt(1000000));

    PasswordResetOtp resetOtp = PasswordResetOtp.builder()
            .user(user)
            .otp(otp)
            .expiryTime(LocalDateTime.now().plusMinutes(5))
            .used(false)
            .build();

    passwordResetOtpRepository.save(resetOtp);

    emailService.sendOtpEmail(user.getEmail(), otp);

    return "OTP sent successfully.";
}

        /**
     * Reset Password
     */
    /**
 * Reset Password using OTP
 */
public String resetPassword(ResetPasswordRequest request) {

    PasswordResetOtp resetOtp = passwordResetOtpRepository
            .findByUserEmail(request.getEmail().trim().toLowerCase())
            .orElseThrow(() ->
                    new IllegalArgumentException("OTP not found."));

    if (resetOtp.isUsed()) {
        throw new IllegalArgumentException("OTP has already been used.");
    }

    if (resetOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
        throw new IllegalArgumentException("OTP has expired.");
    }

    if (!resetOtp.getOtp().equals(request.getOtp())) {
        throw new IllegalArgumentException("Invalid OTP.");
    }

    User user = resetOtp.getUser();

    user.setPassword(passwordEncoder.encode(request.getNewPassword()));

    userRepository.save(user);

    resetOtp.setUsed(true);
    passwordResetOtpRepository.save(resetOtp);

    return "Password reset successful.";
}

}