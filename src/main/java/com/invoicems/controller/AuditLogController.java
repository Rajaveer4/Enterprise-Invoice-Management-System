package com.invoicems.controller;

import com.invoicems.audit.AuditLogService;
import com.invoicems.dto.AuditLogResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/audit-logs")
@RequiredArgsConstructor
public class AuditLogController {

    private final AuditLogService auditLogService;

    @GetMapping("/{entityType}/{entityId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE_EXECUTIVE', 'MANAGER')")
    public ResponseEntity<List<AuditLogResponse>> getAuditLogs(
            @PathVariable String entityType,
            @PathVariable Long entityId
    ) {
        return ResponseEntity.ok(auditLogService.getAuditLogs(entityType, entityId));
    }
}
