package com.invoicems.repository;

import com.invoicems.entity.Invoice;
import com.invoicems.entity.InvoiceStatus;
import com.invoicems.entity.Vendor;
import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    boolean existsByInvoiceNumberAndVendor(String invoiceNumber, Vendor vendor);

    boolean existsByInvoiceNumberAndVendorAndIdNot(String invoiceNumber, Vendor vendor, Long id);

    long countByStatus(InvoiceStatus status);

    long countByStatusIn(Collection<InvoiceStatus> statuses);
}
