package com.invoicems.dto;

public record DashboardSummaryResponse(
        long totalInvoices,
        long approvedInvoices,
        long rejectedInvoices,
        long pendingInvoices,
        long paidInvoices
) {
}
