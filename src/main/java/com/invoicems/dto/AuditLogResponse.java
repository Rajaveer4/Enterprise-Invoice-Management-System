package com.invoicems.dto;

import java.time.LocalDateTime;

public record AuditLogResponse(
        Long id,
        String action,
        String entityType,
        Long entityId,
        String performedBy,
        String details,
        LocalDateTime timestamp
) {
}
