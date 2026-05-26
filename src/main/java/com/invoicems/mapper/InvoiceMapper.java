package com.invoicems.mapper;

import com.invoicems.dto.InvoiceRequest;
import com.invoicems.dto.InvoiceResponse;
import com.invoicems.entity.Invoice;
import com.invoicems.entity.InvoiceStatus;
import com.invoicems.entity.Vendor;
import org.springframework.stereotype.Component;

@Component
public class InvoiceMapper {

    public Invoice toEntity(InvoiceRequest request, Vendor vendor) {
        return Invoice.builder()
                .invoiceNumber(request.invoiceNumber())
                .invoiceDate(request.invoiceDate())
                .vendor(vendor)
                .amount(request.amount())
                .gstAmount(request.gstAmount())
                .status(InvoiceStatus.UPLOADED)
                .pdfUrl(request.pdfUrl())
                .build();
    }

    public void updateEntity(Invoice invoice, InvoiceRequest request, Vendor vendor) {
        invoice.setInvoiceNumber(request.invoiceNumber());
        invoice.setInvoiceDate(request.invoiceDate());
        invoice.setVendor(vendor);
        invoice.setAmount(request.amount());
        invoice.setGstAmount(request.gstAmount());
        invoice.setPdfUrl(request.pdfUrl());
    }

    public InvoiceResponse toResponse(Invoice invoice) {
        return new InvoiceResponse(
                invoice.getId(),
                invoice.getInvoiceNumber(),
                invoice.getInvoiceDate(),
                invoice.getVendor().getId(),
                invoice.getVendor().getVendorName(),
                invoice.getAmount(),
                invoice.getGstAmount(),
                invoice.getStatus(),
                invoice.getPdfUrl(),
                invoice.getCreatedAt()
        );
    }
}
