package com.invoicems.dto;

import jakarta.validation.constraints.NotBlank;

public record WorkflowActionRequest(
        @NotBlank String remarks
) {
}
