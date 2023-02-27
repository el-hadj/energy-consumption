package com.pds.ing2.backendpds2.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private LocalDateTime dateProd;
    private Double quantity;
    private Integer  idSource;


    public ProductionBepos(String nameProd, LocalDateTime dateProd, Double quantity, Integer idSource) {
        this.nameProd = nameProd;
        this.dateProd = dateProd;
        this.quantity = quantity;
        this.idSource = idSource;
    }
}
