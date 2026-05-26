package com.invoicems.dto;

import com.invoicems.entity.InvoiceStatus;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record InvoiceResponse(
        Long id,
        String invoiceNumber,
        LocalDate invoiceDate,
        Long vendorId,
        String vendorName,
        BigDecimal amount,
        BigDecimal gstAmount,
        InvoiceStatus status,
        String pdfUrl,
        LocalDateTime createdAt
) {
}
