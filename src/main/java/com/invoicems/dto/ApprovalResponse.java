package com.invoicems.dto;

import java.time.LocalDateTime;

public record ApprovalResponse(
        Long id,
        String action,
        String remarks,
        LocalDateTime actionTime,
        Long approvedById,
        String approvedByName,
        Long invoiceId
) {
}
