package com.pds.ing2.backendpds2.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Table(name="production_bepos")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Productionbepos {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer  id_prod;
    private String name_prod;
    private LocalDateTime date_prod;
    private Integer quantity;
    private Integer  id_source_prod;


}
