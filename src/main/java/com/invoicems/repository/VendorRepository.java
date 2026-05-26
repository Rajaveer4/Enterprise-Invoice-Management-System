package com.invoicems.repository;

import com.invoicems.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepository extends JpaRepository<Vendor, Long> {

    boolean existsByGstNumber(String gstNumber);

    boolean existsByPanNumber(String panNumber);

    boolean existsByGstNumberAndIdNot(String gstNumber, Long id);

    boolean existsByPanNumberAndIdNot(String panNumber, Long id);
}
