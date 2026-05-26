package com.invoicems.service;

import com.invoicems.entity.User;
import com.invoicems.exception.ResourceNotFoundException;
import com.invoicems.repository.UserRepository;
import com.invoicems.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurrentUserService {

    private final UserRepository userRepository;

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication != null ? authentication.getPrincipal() : null;

        if (principal instanceof UserPrincipal userPrincipal) {
            return userRepository.findByEmail(userPrincipal.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("User", userPrincipal.getId()));
        }

        throw new IllegalStateException("Authenticated user could not be resolved");
    }

    public String getCurrentUserEmail() {
        return getCurrentUser().getEmail();
    }
}
