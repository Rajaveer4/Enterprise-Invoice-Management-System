package com.invoicems.mapper;

import com.invoicems.dto.AuditLogResponse;
import com.invoicems.entity.AuditLog;
import org.springframework.stereotype.Component;

@Component
public class AuditLogMapper {

    public AuditLogResponse toResponse(AuditLog auditLog) {
        return new AuditLogResponse(
                auditLog.getId(),
                auditLog.getAction(),
                auditLog.getEntityType(),
                auditLog.getEntityId(),
                auditLog.getPerformedBy(),
                auditLog.getDetails(),
                auditLog.getTimestamp()
        );
    }
}
