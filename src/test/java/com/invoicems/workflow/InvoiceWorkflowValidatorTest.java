package com.invoicems.workflow;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.invoicems.entity.InvoiceStatus;
import com.invoicems.exception.InvalidStatusTransitionException;
import org.junit.jupiter.api.Test;

class InvoiceWorkflowValidatorTest {

    private final InvoiceWorkflowValidator validator = new InvoiceWorkflowValidator();

    @Test
    void allowsValidStatusTransitions() {
        assertDoesNotThrow(() -> validator.validate(InvoiceStatus.UPLOADED, InvoiceStatus.UNDER_REVIEW));
        assertDoesNotThrow(() -> validator.validate(InvoiceStatus.UNDER_REVIEW, InvoiceStatus.APPROVED));
        assertDoesNotThrow(() -> validator.validate(InvoiceStatus.UNDER_REVIEW, InvoiceStatus.REJECTED));
        assertDoesNotThrow(() -> validator.validate(InvoiceStatus.APPROVED, InvoiceStatus.PAID));
    }

    @Test
    void rejectsInvalidStatusTransitions() {
        assertThrows(
                InvalidStatusTransitionException.class,
                () -> validator.validate(InvoiceStatus.REJECTED, InvoiceStatus.PAID)
        );
        assertThrows(
                InvalidStatusTransitionException.class,
                () -> validator.validate(InvoiceStatus.UPLOADED, InvoiceStatus.APPROVED)
        );
    }
}
