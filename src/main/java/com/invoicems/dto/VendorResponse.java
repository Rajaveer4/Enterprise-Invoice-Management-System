package com.invoicems.dto;

import java.time.LocalDateTime;

public record VendorResponse(
        Long id,
        String vendorName,
        String gstNumber,
        String panNumber,
        String email,
        String bankAccount,
        LocalDateTime createdAt
) {
}
