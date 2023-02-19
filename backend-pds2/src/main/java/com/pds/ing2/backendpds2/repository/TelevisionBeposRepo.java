package com.pds.ing2.backendpds2.repository;

import com.pds.ing2.backendpds2.model.EquipmentBepos;
import com.pds.ing2.backendpds2.model.TelevisionBepos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TelevisionBeposRepo extends JpaRepository<TelevisionBepos,Integer> {

    Optional<TelevisionBepos> findByIdEquip(EquipmentBepos id);
}
