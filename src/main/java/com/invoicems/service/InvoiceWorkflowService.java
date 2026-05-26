package com.invoicems.service;

import com.invoicems.audit.AuditLogService;
import com.invoicems.dto.ApprovalResponse;
import com.invoicems.dto.InvoiceResponse;
import com.invoicems.dto.WorkflowActionRequest;
import com.invoicems.entity.Approval;
import com.invoicems.entity.Invoice;
import com.invoicems.entity.InvoiceStatus;
import com.invoicems.entity.User;
import com.invoicems.mapper.ApprovalMapper;
import com.invoicems.mapper.InvoiceMapper;
import com.invoicems.repository.ApprovalRepository;
import com.invoicems.repository.InvoiceRepository;
import com.invoicems.workflow.InvoiceWorkflowValidator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InvoiceWorkflowService {

    private final InvoiceService invoiceService;
    private final CurrentUserService currentUserService;
    private final InvoiceRepository invoiceRepository;
    private final ApprovalRepository approvalRepository;
    private final InvoiceMapper invoiceMapper;
    private final ApprovalMapper approvalMapper;
    private final InvoiceWorkflowValidator workflowValidator;
    private final AuditLogService auditLogService;

    @Transactional
    public InvoiceResponse markUnderReview(Long invoiceId, WorkflowActionRequest request) {
        return transition(invoiceId, InvoiceStatus.UNDER_REVIEW, "REVIEWED", request.remarks());
    }

    @Transactional
    public InvoiceResponse approve(Long invoiceId, WorkflowActionRequest request) {
        return transition(invoiceId, InvoiceStatus.APPROVED, "APPROVED", request.remarks());
    }

    @Transactional
    public InvoiceResponse reject(Long invoiceId, WorkflowActionRequest request) {
        return transition(invoiceId, InvoiceStatus.REJECTED, "REJECTED", request.remarks());
    }

    public List<ApprovalResponse> getApprovalHistory(Long invoiceId) {
        invoiceService.findInvoice(invoiceId);
        return approvalRepository.findByInvoiceIdOrderByActionTimeAsc(invoiceId)
                .stream()
                .map(approvalMapper::toResponse)
                .toList();
    }

    private InvoiceResponse transition(Long invoiceId, InvoiceStatus nextStatus, String action, String remarks) {
        Invoice invoice = invoiceService.findInvoice(invoiceId);
        workflowValidator.validate(invoice.getStatus(), nextStatus);

        User currentUser = currentUserService.getCurrentUser();
        invoice.setStatus(nextStatus);
        Invoice savedInvoice = invoiceRepository.save(invoice);

        approvalRepository.save(Approval.builder()
                .action(action)
                .remarks(remarks)
                .approvedBy(currentUser)
                .invoice(savedInvoice)
                .build());

        auditLogService.log(
                "INVOICE_" + action,
                "Invoice",
                savedInvoice.getId(),
                currentUser.getEmail(),
                "Invoice status changed to " + nextStatus
        );

        return invoiceMapper.toResponse(savedInvoice);
    }
}
