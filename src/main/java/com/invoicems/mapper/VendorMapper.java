package com.invoicems.mapper;

import com.invoicems.dto.VendorRequest;
import com.invoicems.dto.VendorResponse;
import com.invoicems.entity.Vendor;
import org.springframework.stereotype.Component;

@Component
public class VendorMapper {

    public Vendor toEntity(VendorRequest request) {
        return Vendor.builder()
                .vendorName(request.vendorName())
                .gstNumber(request.gstNumber())
                .panNumber(request.panNumber())
                .email(request.email())
                .bankAccount(request.bankAccount())
                .build();
    }

    public void updateEntity(Vendor vendor, VendorRequest request) {
        vendor.setVendorName(request.vendorName());
        vendor.setGstNumber(request.gstNumber());
        vendor.setPanNumber(request.panNumber());
        vendor.setEmail(request.email());
        vendor.setBankAccount(request.bankAccount());
    }

    public VendorResponse toResponse(Vendor vendor) {
        return new VendorResponse(
                vendor.getId(),
                vendor.getVendorName(),
                vendor.getGstNumber(),
                vendor.getPanNumber(),
                vendor.getEmail(),
                vendor.getBankAccount(),
                vendor.getCreatedAt()
        );
    }
}
