package com.invoicems.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public record PaymentRequest(
        @NotNull @DecimalMin(value = "0.01", message = "Payment amount must be greater than zero") BigDecimal amount,
        @NotBlank String paymentReference,
        @NotNull LocalDate paymentDate
) {
}
