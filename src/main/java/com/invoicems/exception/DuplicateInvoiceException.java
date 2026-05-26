package com.invoicems.exception;

public class DuplicateInvoiceException extends RuntimeException {

    public DuplicateInvoiceException(String invoiceNumber) {
        super("Invoice already exists with number: " + invoiceNumber);
    }
}
