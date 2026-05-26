package com.invoicems.repository;

import com.invoicems.entity.Invoice;
import com.invoicems.entity.Payment;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByInvoice(Invoice invoice);

    boolean existsByPaymentReference(String paymentReference);
}
