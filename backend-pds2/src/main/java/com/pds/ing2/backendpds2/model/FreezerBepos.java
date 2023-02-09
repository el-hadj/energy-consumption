package com.pds.ing2.backendpds2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.persistence.Id;

@Entity
@Table(name="Freezer_bepos")
public class FreezerBepos {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id_freez;

    @Column(name = "state")
    private String state;

    @Column(name = "power")
    private Integer power;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_equip", referencedColumnName = "id_equipment")
    @JsonBackReference
    private Equipmentbepos idEquip;

    public FreezerBepos(Integer id_freez, String state, Integer power, Equipmentbepos idEquip) {
        this.id_freez = id_freez;
        this.state = state;
        this.power = power;
        this.idEquip = idEquip;
    }

    public FreezerBepos(String state, Integer power, Equipmentbepos idEquip) {
        this.state = state;
        this.power = power;
        this.idEquip = idEquip;
    }

    public FreezerBepos(){}

    public Integer getId_freez() {
        return id_freez;
    }

    public void setId_freez(Integer id_freez) {
        this.id_freez = id_freez;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getPower() {
        return power;
    }

    public void setPower(Integer power) {
        this.power = power;
    }

    public Equipmentbepos getIdEquip() {
        return idEquip;
    }

    public void setIdEquip(Equipmentbepos idEquip) {
        this.idEquip = idEquip;
    }
}
