package com.invoicems.audit;

import com.invoicems.dto.AuditLogResponse;
import com.invoicems.entity.AuditLog;
import com.invoicems.mapper.AuditLogMapper;
import com.invoicems.repository.AuditLogRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;
    private final AuditLogMapper auditLogMapper;

    public void log(String action, String entityType, Long entityId, String performedBy, String details) {
        AuditLog auditLog = AuditLog.builder()
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .performedBy(performedBy)
                .details(details)
                .build();
        auditLogRepository.save(auditLog);
    }

    public List<AuditLogResponse> getAuditLogs(String entityType, Long entityId) {
        return auditLogRepository.findByEntityTypeAndEntityIdOrderByTimestampAsc(entityType, entityId)
                .stream()
                .map(auditLogMapper::toResponse)
                .toList();
    }
}
