package com.invoicems.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record PaymentResponse(
        Long id,
        BigDecimal amount,
        String paymentReference,
        LocalDate paymentDate,
        Long invoiceId
) {
}
