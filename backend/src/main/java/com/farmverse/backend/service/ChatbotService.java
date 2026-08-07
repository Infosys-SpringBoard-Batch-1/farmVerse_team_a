package com.farmverse.backend.service;

import com.farmverse.backend.dto.ChatRequest;
import com.farmverse.backend.dto.ChatResponse;
import com.farmverse.backend.entity.Farm;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.repository.FarmRepository;
import com.farmverse.backend.repository.UserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import jakarta.annotation.PostConstruct;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatbotService {

    private final UserRepository userRepository;
    private final FarmRepository farmRepository;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.model}")
    private String geminiModel;

    private User getCurrentUser(){
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByUsername(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }

    private List<Farm> getCurrentUserFarms(User user){
        return farmRepository.findByFarmerId(user.getId());
    }

    public ChatResponse chat(ChatRequest request){
        User user = getCurrentUser();
        List<Farm> farms = getCurrentUserFarms(user);
        log.info("Chat request from {} with {} farms",user.getUsername(),farms.size());
        String geminiResponse = askGemini(request.getMessage());

        return ChatResponse.builder()
                .response(geminiResponse)
                .timestamp(LocalDateTime.now())
                .success(true)
                .build();
    }

    //Gemini Method
    private String askGemini(String prompt){
        Client client = Client.builder()
                .apiKey(geminiApiKey)
                .build();
        GenerateContentResponse response =
                client.models.generateContent(
                        geminiModel,
                        prompt,
                        null
                );
        return response.text();
    }
}
