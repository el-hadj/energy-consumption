package com.pds.ing2.backendpds2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Table(name = "ligth_bepos_conso")
@Data @NoArgsConstructor @AllArgsConstructor
public class LightBeposConso {



    @Id
    @Column(name = "id_cons_light")
    private Integer idConsLight;

    @Column(name = "energy_light")
    private double energyLight;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_equip_light", referencedColumnName = "id_equipment")
    @JsonBackReference
    //@Column(name = "id_equip_light")
    private Equipmentbepos idEquipLight;

    @Column(name = "lightStartTime")
    private LocalDateTime lightDate;


}
