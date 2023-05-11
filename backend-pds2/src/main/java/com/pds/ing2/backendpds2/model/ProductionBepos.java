package com.pds.ing2.backendpds2.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Table(name="production_bepos")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ProductionBepos {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer  idProd;
    private String nameProd;
    private LocalDate dateProd;
    private Double quantity;
    private Integer  idSource;


    public ProductionBepos(String nameProd, LocalDate dateProd, Double quantity, Integer idSource) {
        this.nameProd = nameProd;
        this.dateProd = dateProd;
        this.quantity = quantity;
        this.idSource = idSource;
    }
}
