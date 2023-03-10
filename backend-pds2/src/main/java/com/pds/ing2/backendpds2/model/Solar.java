package com.pds.ing2.backendpds2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "solar")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Solar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "puissance_maximale")
    private double puissanceMaximale;
    @Column(name = "puissance_nominale")
    private double puissanceNominale;
    @Column(name = "ensoleillement")
    private Double ensoleillement;
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_source", referencedColumnName = "id")
    @JsonBackReference
    private SourceProduction idSource;
}
