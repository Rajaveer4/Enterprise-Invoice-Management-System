package com.invoicems.repository;

import com.invoicems.entity.Approval;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalRepository extends JpaRepository<Approval, Long> {

    List<Approval> findByInvoiceIdOrderByActionTimeAsc(Long invoiceId);
}
