package com.invoicems.dto;

import com.invoicems.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateUserRequest(
        @NotBlank String name,
        @Email @NotBlank String email,
        @NotNull Role role
) {
}
