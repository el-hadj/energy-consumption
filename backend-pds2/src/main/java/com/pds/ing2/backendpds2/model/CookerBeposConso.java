package com.pds.ing2.backendpds2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.persistence.Id;

import java.sql.Timestamp;


@Table(name = "cooker_bepos_conso")
public class CookerBeposConso {

    @Id
    @Column(name = "id_cons_cook")
    private Integer idConsCook;

    @Column(name = "energy_cook")
    private double energyCook;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_equip_cook", referencedColumnName = "id_equipment")
    @JsonBackReference
    private Equipmentbepos idEquipCook;

    @Column(name = "cook_time")
    private Timestamp cookTime;

    public CookerBeposConso(Integer idConsCook, double energyCook, Equipmentbepos idEquipCook, Timestamp cookTime) {
        this.idConsCook = idConsCook;
        this.energyCook = energyCook;
        this.idEquipCook = idEquipCook;
        this.cookTime = cookTime;
    }

    public CookerBeposConso(double energyCook, Equipmentbepos idEquipCook, Timestamp cookTime) {
        this.energyCook = energyCook;
        this.idEquipCook = idEquipCook;
        this.cookTime = cookTime;
    }

    public CookerBeposConso(){}

    public Integer getIdConsCook() {
        return idConsCook;
    }

    public void setIdConsCook(Integer idConsCook) {
        this.idConsCook = idConsCook;
    }

    public double getEnergyCook() {
        return energyCook;
    }

    public void setEnergyCook(double energyCook) {
        this.energyCook = energyCook;
    }

    public Equipmentbepos getIdEquipCook() {
        return idEquipCook;
    }

    public void setIdEquipCook(Equipmentbepos idEquipCook) {
        this.idEquipCook = idEquipCook;
    }

    public Timestamp getCookTime() {
        return cookTime;
    }

    public void setCookTime(Timestamp cookTime) {
        this.cookTime = cookTime;
    }
}
