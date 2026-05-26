package com.invoicems.mapper;

import com.invoicems.dto.PaymentResponse;
import com.invoicems.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public PaymentResponse toResponse(Payment payment) {
        return new PaymentResponse(
                payment.getId(),
                payment.getAmount(),
                payment.getPaymentReference(),
                payment.getPaymentDate(),
                payment.getInvoice().getId()
        );
    }
}
