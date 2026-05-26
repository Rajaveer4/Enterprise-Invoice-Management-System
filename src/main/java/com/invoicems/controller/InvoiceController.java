package com.invoicems.controller;

import com.invoicems.dto.InvoiceRequest;
import com.invoicems.dto.InvoiceResponse;
import com.invoicems.dto.PaymentRequest;
import com.invoicems.dto.PaymentResponse;
import com.invoicems.dto.WorkflowActionRequest;
import com.invoicems.service.InvoiceService;
import com.invoicems.service.InvoiceWorkflowService;
import com.invoicems.service.PaymentService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final InvoiceWorkflowService invoiceWorkflowService;
    private final PaymentService paymentService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'VENDOR')")
    public ResponseEntity<InvoiceResponse> createInvoice(@Valid @RequestBody InvoiceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(invoiceService.createInvoice(request));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE_EXECUTIVE', 'MANAGER')")
    public ResponseEntity<List<InvoiceResponse>> getInvoices() {
        return ResponseEntity.ok(invoiceService.getInvoices());
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<InvoiceResponse> getInvoice(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.getInvoice(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'VENDOR')")
    public ResponseEntity<InvoiceResponse> updateInvoice(
            @PathVariable Long id,
            @Valid @RequestBody InvoiceRequest request
    ) {
        return ResponseEntity.ok(invoiceService.updateInvoice(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
        invoiceService.deleteInvoice(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/review")
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE_EXECUTIVE')")
    public ResponseEntity<InvoiceResponse> reviewInvoice(
            @PathVariable Long id,
            @Valid @RequestBody WorkflowActionRequest request
    ) {
        return ResponseEntity.ok(invoiceWorkflowService.markUnderReview(id, request));
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<InvoiceResponse> approveInvoice(
            @PathVariable Long id,
            @Valid @RequestBody WorkflowActionRequest request
    ) {
        return ResponseEntity.ok(invoiceWorkflowService.approve(id, request));
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<InvoiceResponse> rejectInvoice(
            @PathVariable Long id,
            @Valid @RequestBody WorkflowActionRequest request
    ) {
        return ResponseEntity.ok(invoiceWorkflowService.reject(id, request));
    }

    @PutMapping("/{id}/payment")
    @PreAuthorize("hasAnyRole('ADMIN', 'FINANCE_EXECUTIVE')")
    public ResponseEntity<PaymentResponse> markPaymentCompleted(
            @PathVariable Long id,
            @Valid @RequestBody PaymentRequest request
    ) {
        return ResponseEntity.ok(paymentService.markPaymentCompleted(id, request));
    }
}
