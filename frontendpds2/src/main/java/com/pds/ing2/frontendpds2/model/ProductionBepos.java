package com.pds.ing2.frontendpds2.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductionBepos {

    private Integer  idProd;
    private String nameProd;
    private LocalDateTime dateProd;
    private Double quantity;
    private Integer  idSource;

}
