package com.pds.ing2.backendpds2.repository;

import com.pds.ing2.backendpds2.model.Solar;
import com.pds.ing2.backendpds2.model.SourceProduction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SolarRepo extends JpaRepository<Solar, Integer> {



    Optional<Solar> findByIdSource(SourceProduction s);

}
