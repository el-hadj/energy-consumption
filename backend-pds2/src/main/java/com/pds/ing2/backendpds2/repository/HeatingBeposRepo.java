package com.pds.ing2.backendpds2.repository;

import com.pds.ing2.backendpds2.model.EquipmentBepos;
import com.pds.ing2.backendpds2.model.HeatingBepos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HeatingBeposRepo extends JpaRepository<HeatingBepos, Integer> {

    Optional<HeatingBepos> findByIdEquip(EquipmentBepos id);
}
