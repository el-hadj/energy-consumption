package com.pds.ing2.backendpds2.repository;

import com.pds.ing2.backendpds2.model.EquipmentBepos;
import com.pds.ing2.backendpds2.model.HeatingBepos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface HeatingBeposRepo extends JpaRepository<HeatingBepos, Integer> {

    Optional<HeatingBepos> findByIdEquip(EquipmentBepos id);

    @Modifying
    @Query(nativeQuery = true)
    void updateState(@Param("id") Integer id, @Param("state") boolean state);
}
