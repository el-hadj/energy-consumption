package com.pds.ing2.backendpds2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Table(name = "laundry_bepos_conso")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LaundryBeposConso {

    @Id
    @Column(name = "id_cons_laundry")
    private Integer idConsLaundry;

    @Column(name = "energy_laundry")
    private double energyLandry;


    @Column(name = "laundry_time")
    private LocalDateTime laundryTime;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_equip_laundry", referencedColumnName = "id_equipment")
    @JsonBackReference
    private Equipmentbepos idEquipLaundry;

}
