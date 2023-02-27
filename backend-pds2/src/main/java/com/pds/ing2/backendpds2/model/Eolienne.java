package com.pds.ing2.backendpds2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="eolienne")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Eolienne {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    private double puissanceMaximale;
    private double puissanceNominale;
    private double vitesseVent;
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_source", referencedColumnName = "id")
    @JsonBackReference
    private SourceProduction idSource;


}
