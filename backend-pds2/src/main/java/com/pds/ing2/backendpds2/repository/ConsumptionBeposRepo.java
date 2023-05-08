package com.pds.ing2.backendpds2.repository;

import com.pds.ing2.backendpds2.model.ConsumptionBepos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Repository
public interface ConsumptionBeposRepo extends JpaRepository<ConsumptionBepos, Integer>{

    @Query(nativeQuery = true)
    List<Map<String, String>> getEquipementByIdRoom(@Param("idRoom") Integer id);

    @Query(nativeQuery = true)
    LocalDateTime findLatestTime ();

    @Query(value = "SELECT DATE_TRUNC('hour', c.start_time) AS hour, SUM(c.energy_power) AS total_energy "
            + "FROM consumption_bepos c WHERE DATE(c.start_time) = :targetDate GROUP BY hour ORDER BY hour", nativeQuery = true)
    List<Object[]> findConsumptionByDay (@Param("targetDate") LocalDate targetDate);



}
