package com.invoicems.controller;

import com.invoicems.dto.ApprovalResponse;
import com.invoicems.service.InvoiceWorkflowService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/invoices/{invoiceId}/approvals")
@RequiredArgsConstructor
public class ApprovalController {

    private final InvoiceWorkflowService invoiceWorkflowService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE_EXECUTIVE', 'MANAGER')")
    public ResponseEntity<List<ApprovalResponse>> getApprovalHistory(@PathVariable Long invoiceId) {
        return ResponseEntity.ok(invoiceWorkflowService.getApprovalHistory(invoiceId));
    }
}
