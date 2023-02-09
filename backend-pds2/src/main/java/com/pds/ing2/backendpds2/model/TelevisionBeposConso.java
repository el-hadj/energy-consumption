package com.pds.ing2.backendpds2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Table(name="tv_bepos_conso")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TelevisionBeposConso {

    @Id
    @Column(name = "id_cons_tv")
    private Integer idConsTv;

    @Column(name = "energy_tv")
    private double energyTv;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_equip_tv", referencedColumnName = "id_equipment")
    @JsonBackReference
    private Equipmentbepos idEquipTv;

    @Column(name = "tv_time")
    private LocalDateTime tvTime;

}
