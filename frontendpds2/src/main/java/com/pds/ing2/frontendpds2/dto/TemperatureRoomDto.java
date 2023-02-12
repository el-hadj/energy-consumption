package com.pds.ing2.frontendpds2.dto;

import java.io.Serializable;

public class TemperatureRoomDto implements Serializable {

    private Integer temperaturePiece;
    private Integer temperatureVoisin;

    public TemperatureRoomDto() {
    }

    public TemperatureRoomDto(Integer temperaturePiece, Integer temperatureVoisin) {
        this.temperaturePiece = temperaturePiece;
        this.temperatureVoisin = temperatureVoisin;
    }

    public Integer getTemperaturePiece() {
        return temperaturePiece;
    }

    public void setTemperaturePiece(Integer temperaturePiece) {
        this.temperaturePiece = temperaturePiece;
    }

    public Integer getTemperatureVoisin() {
        return temperatureVoisin;
    }

    public void setTemperatureVoisin(Integer temperatureVoisin) {
        this.temperatureVoisin = temperatureVoisin;
    }
}
