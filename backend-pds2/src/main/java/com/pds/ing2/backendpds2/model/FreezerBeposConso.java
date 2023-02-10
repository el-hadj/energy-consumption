package com.pds.ing2.backendpds2.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name="freezer_bepos_conso")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FreezerBeposConso {

    @Id
    @Column(name = "id_cons_freez")
    private Integer idConsFreez;

    @Column(name = "energy_freez")
    private double energyFreez;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_equip_freez", referencedColumnName = "id_equipment")
    @JsonBackReference
    private EquipmentBepos idEquipFreez;

    @Column(name = "freez_time")
    private LocalDateTime freezTime;


}
