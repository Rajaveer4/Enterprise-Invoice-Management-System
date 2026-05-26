package com.invoicems.workflow;

import com.invoicems.entity.InvoiceStatus;
import com.invoicems.exception.InvalidStatusTransitionException;
import java.util.Map;
import java.util.Set;
import org.springframework.stereotype.Component;

@Component
public class InvoiceWorkflowValidator {

    private static final Map<InvoiceStatus, Set<InvoiceStatus>> ALLOWED_TRANSITIONS = Map.of(
            InvoiceStatus.UPLOADED, Set.of(InvoiceStatus.UNDER_REVIEW),
            InvoiceStatus.UNDER_REVIEW, Set.of(InvoiceStatus.APPROVED, InvoiceStatus.REJECTED),
            InvoiceStatus.APPROVED, Set.of(InvoiceStatus.PAID)
    );

    public void validate(InvoiceStatus currentStatus, InvoiceStatus nextStatus) {
        boolean allowed = ALLOWED_TRANSITIONS
                .getOrDefault(currentStatus, Set.of())
                .contains(nextStatus);

        if (!allowed) {
            throw new InvalidStatusTransitionException(currentStatus, nextStatus);
        }
    }
}
