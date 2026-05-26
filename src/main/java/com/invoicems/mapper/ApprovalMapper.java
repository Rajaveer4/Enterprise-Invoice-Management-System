package com.invoicems.mapper;

import com.invoicems.dto.ApprovalResponse;
import com.invoicems.entity.Approval;
import org.springframework.stereotype.Component;

@Component
public class ApprovalMapper {

    public ApprovalResponse toResponse(Approval approval) {
        return new ApprovalResponse(
                approval.getId(),
                approval.getAction(),
                approval.getRemarks(),
                approval.getActionTime(),
                approval.getApprovedBy() != null ? approval.getApprovedBy().getId() : null,
                approval.getApprovedBy() != null ? approval.getApprovedBy().getName() : null,
                approval.getInvoice().getId()
        );
    }
}
