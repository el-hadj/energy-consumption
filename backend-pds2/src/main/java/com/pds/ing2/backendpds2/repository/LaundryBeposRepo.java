package com.pds.ing2.backendpds2.repository;


import com.pds.ing2.backendpds2.model.LaundryBepos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LaundryBeposRepo extends JpaRepository<LaundryBepos, Integer> {


}
