package com.invoicems.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import com.invoicems.dto.DashboardSummaryResponse;
import com.invoicems.entity.InvoiceStatus;
import com.invoicems.repository.InvoiceRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class DashboardServiceTest {

    @Mock
    private InvoiceRepository invoiceRepository;

    @InjectMocks
    private DashboardService dashboardService;

    @Test
    void buildsDashboardSummaryFromInvoiceCounts() {
        when(invoiceRepository.count()).thenReturn(12L);
        when(invoiceRepository.countByStatus(InvoiceStatus.APPROVED)).thenReturn(5L);
        when(invoiceRepository.countByStatus(InvoiceStatus.REJECTED)).thenReturn(2L);
        when(invoiceRepository.countByStatus(InvoiceStatus.PAID)).thenReturn(3L);
        when(invoiceRepository.countByStatusIn(List.of(InvoiceStatus.UPLOADED, InvoiceStatus.UNDER_REVIEW)))
                .thenReturn(2L);

        DashboardSummaryResponse summary = dashboardService.getSummary();

        assertThat(summary.totalInvoices()).isEqualTo(12L);
        assertThat(summary.approvedInvoices()).isEqualTo(5L);
        assertThat(summary.rejectedInvoices()).isEqualTo(2L);
        assertThat(summary.pendingInvoices()).isEqualTo(2L);
        assertThat(summary.paidInvoices()).isEqualTo(3L);
    }
}
