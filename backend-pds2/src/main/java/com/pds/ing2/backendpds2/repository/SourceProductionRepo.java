package com.pds.ing2.backendpds2.repository;

import com.pds.ing2.backendpds2.model.SourceProduction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SourceProductionRepo extends JpaRepository<SourceProduction, Integer> {
}
