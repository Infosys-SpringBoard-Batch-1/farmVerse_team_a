package com.farmverse.backend.service;

import com.farmverse.backend.dto.ChatRequest;
import com.farmverse.backend.dto.ChatResponse;
import com.farmverse.backend.entity.Farm;
import com.farmverse.backend.entity.User;
import com.farmverse.backend.repository.ConversationMessageRepository;
import com.farmverse.backend.repository.FarmRepository;
import com.farmverse.backend.repository.UserRepository;
import com.google.genai.types.GenerateContentConfig;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import jakarta.annotation.PostConstruct;
import com.farmverse.backend.entity.Farm;
import com.farmverse.backend.entity.Crop;
import java.util.List;
import com.farmverse.backend.entity.ConversationMessage;
import com.farmverse.backend.repository.ConversationMessageRepository;

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
    //injecting repository
    private final ConversationMessageRepository conversationMessageRepository;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.model}")
    private String geminiModel;

    @Value("${gemini.temperature}")
    private Float geminiTemperature;

    @Value("${gemini.max-output-tokens}")
    private Integer geminiMaxOutputTokens;

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

    public ChatResponse chat(ChatRequest request) {

        User user = getCurrentUser();

        List<Farm> farms = getCurrentUserFarms(user);

        List<ConversationMessage> history = getConversationHistory(user);

        log.info("Chat request from {} with {} farms", user.getUsername(), farms.size());

        String prompt = buildPrompt(user, farms, history, request);

        log.info("Generated Prompt:\n{}", prompt);

        try {

            String geminiResponse = askGemini(prompt);

            saveMessage(user, "USER", request.getMessage());
            saveMessage(user, "ASSISTANT", geminiResponse);

            return ChatResponse.builder()
                    .response(geminiResponse)
                    .timestamp(LocalDateTime.now())
                    .success(true)
                    .build();

        } catch (Exception e) {

            log.error("Error while communicating with Gemini", e);

            return ChatResponse.builder()
                    .response("I'm currently unable to process your request. Please try again in a few moments.")
                    .timestamp(LocalDateTime.now())
                    .success(false)
                    .error(e.getMessage())
                    .build();
        }
    }

    //Gemini Method
    private String askGemini(String prompt) {

        Client client = Client.builder()
                .apiKey(geminiApiKey)
                .build();

        GenerateContentConfig config = GenerateContentConfig.builder()
                .temperature(geminiTemperature)
                .maxOutputTokens(geminiMaxOutputTokens)
                .build();

        GenerateContentResponse response =
                client.models.generateContent(
                        geminiModel,
                        prompt,
                        config
                );

        return response.text();
    }

    private String buildPrompt(User user,
                               List<Farm> farms,
                               List<ConversationMessage> history,
                               ChatRequest request){
        StringBuilder prompt = new StringBuilder();
        prompt.append("""
                You are Krishi AI, an intelligent agricultural professional developed for the FarmVerse platform to assist Indian farmers.
                
                Be polite and natural. Greet only at the beginning of a new conversation or when appropriate.
                Always provide agricultural guidance using simple language.
                Keep responses between 4 and 5 lines maximum.
                
                If information is insufficient, ask follow-up questions.
                
                Prioritize advice for crops currently registered by the farmer. If the user asks about another crop, answer it but clearly mention that it is not currently registered on their FarmVerse account.
                
                CRITICAL FORMATTING RULES:
                - ALWAYS format your response using standard HTML tags. DO NOT use Markdown.
                - Use <br> for line breaks. Use <ul> and <li> for lists.
                - ALWAYS highlight important words, crop names, and key actions in bold using <b> tags.
                - If you are giving a negative response, a warning, or an alert, wrap that specific sentence in <span style="color: #dc2626; font-weight: bold;">
                - If you are giving a highly positive response or good news, wrap that specific sentence in <span style="color: #16a34a; font-weight: bold;">
                
                When appropriate:
                - Mention precautions only when they are relevant to the user's question. Do not force a precaution into every response.
                - End with a practical recommendation or a relevant follow-up question, but only when it feels natural. Avoid repeating the same closing in every response.
                
                Do not answer unrelated questions. Do not provide political, diplomatic, or non-agricultural opinions.
                Never provide medical advice. Never recommend illegal pesticides.
                Do not fabricate information from the user's FarmVerse account.
                If farm information is unavailable, state that clearly and answer only using the user's question.
                Never invent facts. If you are unsure, say you do not know.
                """);
        prompt.append("\nFarmer Information\n");
        prompt.append("Username: ").append(user.getUsername()).append("\n");
        prompt.append("Name: ").append(user.getFullName()).append("\n");
        prompt.append("Email: ").append(user.getEmail()).append("\n\n");

        prompt.append("\nRegistered Farms: \n");
        if (farms.isEmpty()) {
            prompt.append("No farms registered.\n\n");
        } else {
            for (Farm farm : farms) {
                prompt.append("Farm Name: ")
                        .append(farm.getFarmName())
                        .append("\n");

                prompt.append("Farm Type: ")
                        .append(farm.getFarmType())
                        .append("\n");

                prompt.append("Location: ")
                        .append(farm.getLocation())
                        .append("\n");

                prompt.append("Soil Type: ")
                        .append(farm.getSoilType())
                        .append("\n");

                prompt.append("Area (sq. m): ")
                        .append(farm.getAreaSqMt())
                        .append("\n");

                prompt.append("Registered Crops:\n");

                if (farm.getCrops().isEmpty()) {
                    prompt.append("- No crops registered.\n");
                } else {
                    for (Crop crop : farm.getCrops()) {
                        prompt.append("- Crop Name: ")
                                .append(crop.getCropName())
                                .append("\n");

                        prompt.append("  Crop Type: ")
                                .append(crop.getCropType())
                                .append("\n");

                        prompt.append("  Quantity:  ")
                                .append(crop.getQuantity())
                                .append("\n");

                        prompt.append("  Sowing Date:  ")
                                .append(crop.getSowingDate())
                                .append("\n");

                        prompt.append("  Expected Harvest Date:  ")
                                .append(crop.getHarvestDate())
                                .append("\n\n");
                    }
                }

                prompt.append("----------------------------------\n");
            }
        }
        prompt.append("\nConversation History\n");

        Collections.reverse(history);

        for (ConversationMessage message : history) {
            prompt.append(message.getRole())
                    .append(": ")
                    .append(message.getMessage())
                    .append("\n");
        }

        prompt.append("\n");

        prompt.append("\n Farmer Question:\n");
        prompt.append(request.getMessage());
        return prompt.toString();
    }

    //Conversation context
    private void saveMessage(User user, String role, String message) {

        ConversationMessage conversationMessage = new ConversationMessage();

        conversationMessage.setUser(user);
        conversationMessage.setRole(role);
        conversationMessage.setMessage(message);

        conversationMessageRepository.save(conversationMessage);
    }

    private List<ConversationMessage> getConversationHistory(User user) {
        return conversationMessageRepository.findTop8ByUserOrderByCreatedAtDesc(user);
    }
}
