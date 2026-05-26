package com.invoicems.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public record InvoiceRequest(
        @NotBlank String invoiceNumber,
        @NotNull LocalDate invoiceDate,
        @NotNull Long vendorId,
        @NotNull @DecimalMin(value = "0.01", message = "Invoice amount must be greater than zero") BigDecimal amount,
        @NotNull @DecimalMin(value = "0.00", message = "GST amount cannot be negative") BigDecimal gstAmount,
        String pdfUrl
) {
}
