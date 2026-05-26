package com.invoicems.service;

import com.invoicems.audit.AuditLogService;
import com.invoicems.dto.PaymentRequest;
import com.invoicems.dto.PaymentResponse;
import com.invoicems.entity.Invoice;
import com.invoicems.entity.InvoiceStatus;
import com.invoicems.entity.Payment;
import com.invoicems.exception.InvalidStatusTransitionException;
import com.invoicems.mapper.PaymentMapper;
import com.invoicems.repository.InvoiceRepository;
import com.invoicems.repository.PaymentRepository;
import com.invoicems.workflow.InvoiceWorkflowValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final InvoiceService invoiceService;
    private final CurrentUserService currentUserService;
    private final InvoiceRepository invoiceRepository;
    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;
    private final InvoiceWorkflowValidator workflowValidator;
    private final AuditLogService auditLogService;

    @Transactional
    public PaymentResponse markPaymentCompleted(Long invoiceId, PaymentRequest request) {
        Invoice invoice = invoiceService.findInvoice(invoiceId);
        workflowValidator.validate(invoice.getStatus(), InvoiceStatus.PAID);

        paymentRepository.findByInvoice(invoice).ifPresent(existingPayment -> {
            throw new IllegalStateException("Payment is already completed for invoice id: " + invoiceId);
        });

        if (paymentRepository.existsByPaymentReference(request.paymentReference())) {
            throw new IllegalArgumentException("Payment already exists with reference: " + request.paymentReference());
        }

        Payment payment = Payment.builder()
                .amount(request.amount())
                .paymentReference(request.paymentReference())
                .paymentDate(request.paymentDate())
                .invoice(invoice)
                .build();

        invoice.setStatus(InvoiceStatus.PAID);
        invoiceRepository.save(invoice);
        Payment savedPayment = paymentRepository.save(payment);

        auditLogService.log(
                "PAYMENT_COMPLETED",
                "Invoice",
                invoice.getId(),
                currentUserService.getCurrentUserEmail(),
                "Payment reference: " + savedPayment.getPaymentReference()
        );

        return paymentMapper.toResponse(savedPayment);
    }
}
