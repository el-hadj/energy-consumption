package com.pds.ing2.backendpds2.repository;

import com.pds.ing2.backendpds2.model.RoomBepos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomBeposRepo extends JpaRepository<RoomBepos,Integer> {

    @Query(nativeQuery = true)
    List<RoomBepos> getAllRoomsByUserId(@Param("id") Integer id);

}
