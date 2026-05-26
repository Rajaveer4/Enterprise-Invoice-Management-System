package com.invoicems.service;

import com.invoicems.audit.AuditLogService;
import com.invoicems.dto.InvoiceRequest;
import com.invoicems.dto.InvoiceResponse;
import com.invoicems.entity.Invoice;
import com.invoicems.entity.Vendor;
import com.invoicems.exception.DuplicateInvoiceException;
import com.invoicems.exception.ResourceNotFoundException;
import com.invoicems.mapper.InvoiceMapper;
import com.invoicems.repository.InvoiceRepository;
import com.invoicems.repository.VendorRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final VendorRepository vendorRepository;
    private final InvoiceMapper invoiceMapper;
    private final AuditLogService auditLogService;
    private final CurrentUserService currentUserService;

    public InvoiceResponse createInvoice(InvoiceRequest request) {
        Vendor vendor = findVendor(request.vendorId());
        if (invoiceRepository.existsByInvoiceNumberAndVendor(request.invoiceNumber(), vendor)) {
            throw new DuplicateInvoiceException(request.invoiceNumber());
        }

        Invoice invoice = invoiceMapper.toEntity(request, vendor);
        Invoice savedInvoice = invoiceRepository.save(invoice);
        auditLogService.log(
                "INVOICE_UPLOADED",
                "Invoice",
                savedInvoice.getId(),
                currentUserService.getCurrentUserEmail(),
                "Invoice uploaded by vendor"
        );
        return invoiceMapper.toResponse(savedInvoice);
    }

    public List<InvoiceResponse> getInvoices() {
        return invoiceRepository.findAll()
                .stream()
                .map(invoiceMapper::toResponse)
                .toList();
    }

    public InvoiceResponse getInvoice(Long id) {
        return invoiceMapper.toResponse(findInvoice(id));
    }

    public InvoiceResponse updateInvoice(Long id, InvoiceRequest request) {
        Invoice invoice = findInvoice(id);
        Vendor vendor = findVendor(request.vendorId());

        if (invoiceRepository.existsByInvoiceNumberAndVendorAndIdNot(request.invoiceNumber(), vendor, id)) {
            throw new DuplicateInvoiceException(request.invoiceNumber());
        }

        invoiceMapper.updateEntity(invoice, request, vendor);
        Invoice savedInvoice = invoiceRepository.save(invoice);
        auditLogService.log(
                "INVOICE_UPDATED",
                "Invoice",
                savedInvoice.getId(),
                currentUserService.getCurrentUserEmail(),
                "Invoice master details updated"
        );
        return invoiceMapper.toResponse(savedInvoice);
    }

    public void deleteInvoice(Long id) {
        if (!invoiceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Invoice", id);
        }
        invoiceRepository.deleteById(id);
    }

    public Invoice findInvoice(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice", id));
    }

    private Vendor findVendor(Long id) {
        return vendorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor", id));
    }
}
