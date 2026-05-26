package com.invoicems.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record VendorRequest(
        @NotBlank String vendorName,
        @Pattern(
                regexp = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$",
                message = "GST number must be a valid 15-character Indian GSTIN"
        )
        String gstNumber,
        @Pattern(
                regexp = "^[A-Z]{5}[0-9]{4}[A-Z]$",
                message = "PAN number must be a valid 10-character Indian PAN"
        )
        String panNumber,
        @Email @NotBlank String email,
        @NotBlank String bankAccount
) {
}
