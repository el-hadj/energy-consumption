package com.pds.ing2.backendpds2.repository;

import com.pds.ing2.backendpds2.model.ProductionBepos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProductionBeposRepo extends JpaRepository<ProductionBepos, Integer> {

    @Query(nativeQuery = true)
    List<Map<String, String>> getAllProduction();
}
