package com.pds.ing2.backendpds2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "laundry_bepos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LaundryBepos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_laundry;

    @Column(name = "state")
    private boolean state;

    @Column(name = "power")
    private Integer power;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_equip", referencedColumnName = "id_equipment")
    @JsonBackReference
    private Equipmentbepos idEquip;

}
