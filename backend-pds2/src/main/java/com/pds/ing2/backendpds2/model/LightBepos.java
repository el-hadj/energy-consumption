package com.pds.ing2.backendpds2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="light_bepos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LightBepos {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer idLight;
    private Integer intensity;
    private Boolean state;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_equip", referencedColumnName = "id_equipment")
    @JsonBackReference
    private EquipmentBepos idEquip;
    private LocalDateTime localDateTime;

}
