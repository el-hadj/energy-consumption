package com.pds.ing2.backendpds2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="heating_bepos")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HeatingBepos {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id_heating;
    @Column(name = "thermostat")
    private Integer thermostat;
    @Column(name= "state")
    private String state;
    @Column(name="mode")
    private String mode;
    @Column(name= "hour_start")
    private Integer hourStart;
    @Column(name="hour_end")
    private Integer hourEnd;
    @Column(name="temp_declench")
    private Integer tempDeclench;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_equip", referencedColumnName = "id_equipment")
    @JsonBackReference
    private EquipmentBepos idEquip;

}
