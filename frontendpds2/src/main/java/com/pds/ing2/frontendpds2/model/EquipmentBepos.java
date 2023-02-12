package com.pds.ing2.frontendpds2.model;

public class EquipmentBepos {
        private Integer idEquipment;
        private String nomEquipment;
        private Integer idRoom;

    public EquipmentBepos(Integer idEquipment, String nomEquipment, Integer idRoom) {
        this.idEquipment = idEquipment;
        this.nomEquipment = nomEquipment;
        this.idRoom = idRoom;
    }

    public EquipmentBepos() {
    }

    public Integer getIdEquipment() {
        return idEquipment;
    }

    public void setIdEquipment(Integer idEquipment) {
        this.idEquipment = idEquipment;
    }

    public String getNomEquipment() {
        return nomEquipment;
    }

    public void setNomEquipment(String nomEquipment) {
        this.nomEquipment = nomEquipment;
    }

    public Integer getIdRoom() {
        return idRoom;
    }

    public void setIdRoom(Integer idRoom) {
        this.idRoom = idRoom;
    }
}
