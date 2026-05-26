package com.invoicems.exception;

import com.invoicems.entity.InvoiceStatus;

public class InvalidStatusTransitionException extends RuntimeException {

    public InvalidStatusTransitionException(InvoiceStatus currentStatus, InvoiceStatus nextStatus) {
        super("Invalid invoice status transition: " + currentStatus + " -> " + nextStatus);
    }
}
