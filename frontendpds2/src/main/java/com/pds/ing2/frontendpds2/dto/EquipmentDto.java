package com.pds.ing2.frontendpds2.dto;

public class EquipmentDto {

    private Integer id;
    private String equipment;
    private String activation;
    private String information;
    private String state;

    public EquipmentDto() {
    }

    public EquipmentDto(Integer id, String equipment, String activation, String information, String state) {
        this.id = id;
        this.equipment = equipment;
        this.activation = activation;
        this.information = information;
        this.state = state;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public String getActivation() {
        return activation;
    }

    public void setActivation(String activation) {
        this.activation = activation;
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
