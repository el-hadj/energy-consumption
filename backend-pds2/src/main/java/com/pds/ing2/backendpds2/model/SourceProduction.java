package com.pds.ing2.backendpds2.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="source_production")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SourceProduction {


    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    private String name;

}
