package com.pds.ing2.backendpds2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="cooker_bepos")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CookerBepos {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id_cooker;

    @Column(name = "state")
    private String state;

    @Column(name = "power")
    private Integer power;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_equip", referencedColumnName = "id_equipment")
    @JsonBackReference
    private Equipmentbepos idEquip;

}
