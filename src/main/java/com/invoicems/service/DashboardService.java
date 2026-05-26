package com.invoicems.service;

import com.invoicems.dto.DashboardSummaryResponse;
import com.invoicems.entity.InvoiceStatus;
import com.invoicems.repository.InvoiceRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final InvoiceRepository invoiceRepository;

    public DashboardSummaryResponse getSummary() {
        long approvedInvoices = invoiceRepository.countByStatus(InvoiceStatus.APPROVED);
        long rejectedInvoices = invoiceRepository.countByStatus(InvoiceStatus.REJECTED);
        long paidInvoices = invoiceRepository.countByStatus(InvoiceStatus.PAID);
        long pendingInvoices = invoiceRepository.countByStatusIn(List.of(
                InvoiceStatus.UPLOADED,
                InvoiceStatus.UNDER_REVIEW
        ));

        return new DashboardSummaryResponse(
                invoiceRepository.count(),
                approvedInvoices,
                rejectedInvoices,
                pendingInvoices,
                paidInvoices
        );
    }
}
