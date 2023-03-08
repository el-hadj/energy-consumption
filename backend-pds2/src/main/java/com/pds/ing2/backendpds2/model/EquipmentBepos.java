package com.pds.ing2.backendpds2.model;


import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "equipment_bepos")
public class EquipmentBepos {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id_equipment")
    private Integer idEquipment;
    @Column(name = "nom_equipment")
    private String nomEquipment;
    @Column(name = "id_room")
    private Integer idRoom;
    @Column(name = "type_equipment")
    private String typeEquipment;


}
