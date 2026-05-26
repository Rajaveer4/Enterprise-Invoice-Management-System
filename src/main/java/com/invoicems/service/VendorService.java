package com.invoicems.service;

import com.invoicems.dto.VendorRequest;
import com.invoicems.dto.VendorResponse;
import com.invoicems.entity.Vendor;
import com.invoicems.exception.ResourceNotFoundException;
import com.invoicems.mapper.VendorMapper;
import com.invoicems.repository.VendorRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VendorService {

    private final VendorRepository vendorRepository;
    private final VendorMapper vendorMapper;

    public VendorResponse createVendor(VendorRequest request) {
        validateUniqueVendorDetails(request);
        Vendor vendor = vendorMapper.toEntity(request);
        return vendorMapper.toResponse(vendorRepository.save(vendor));
    }

    public List<VendorResponse> getVendors() {
        return vendorRepository.findAll()
                .stream()
                .map(vendorMapper::toResponse)
                .toList();
    }

    public VendorResponse getVendor(Long id) {
        return vendorMapper.toResponse(findVendor(id));
    }

    public VendorResponse updateVendor(Long id, VendorRequest request) {
        Vendor vendor = findVendor(id);
        validateUniqueVendorDetails(id, request);
        vendorMapper.updateEntity(vendor, request);
        return vendorMapper.toResponse(vendorRepository.save(vendor));
    }

    public void deleteVendor(Long id) {
        if (!vendorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vendor", id);
        }
        vendorRepository.deleteById(id);
    }

    private Vendor findVendor(Long id) {
        return vendorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor", id));
    }

    private void validateUniqueVendorDetails(VendorRequest request) {
        if (vendorRepository.existsByGstNumber(request.gstNumber())) {
            throw new IllegalArgumentException("Vendor already exists with GST number: " + request.gstNumber());
        }
        if (vendorRepository.existsByPanNumber(request.panNumber())) {
            throw new IllegalArgumentException("Vendor already exists with PAN number: " + request.panNumber());
        }
    }

    private void validateUniqueVendorDetails(Long id, VendorRequest request) {
        if (vendorRepository.existsByGstNumberAndIdNot(request.gstNumber(), id)) {
            throw new IllegalArgumentException("Vendor already exists with GST number: " + request.gstNumber());
        }
        if (vendorRepository.existsByPanNumberAndIdNot(request.panNumber(), id)) {
            throw new IllegalArgumentException("Vendor already exists with PAN number: " + request.panNumber());
        }
    }
}
