package com.invoicems.dto;

import com.invoicems.entity.Role;

public record AuthResponse(
        String token,
        Long userId,
        String name,
        String email,
        Role role
) {
}
