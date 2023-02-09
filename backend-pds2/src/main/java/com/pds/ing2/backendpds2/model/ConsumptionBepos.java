package com.pds.ing2.backendpds2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "consumption_bepos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsumptionBepos {
    @Id
    @Column(name = "id_cons")
    private Integer idConsBep;
    @Column(name = "energy_power")
    private double energyPower;
    @Column(name = "start_time")
    private LocalDateTime startTime;
    @Column(name = "state")
    private boolean stateCons;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "num_equipment", referencedColumnName = "id_equipment")
    @JsonBackReference
    private Equipmentbepos numEquipment;



    
}
