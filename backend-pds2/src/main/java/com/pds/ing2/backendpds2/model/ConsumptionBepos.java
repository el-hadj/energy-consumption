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
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "cons_bep_gen")
    @TableGenerator(name = "cons_bep_gen", table = "id_generator", pkColumnName = "gen_name",
            valueColumnName = "gen_value", initialValue = 1, allocationSize = 1)
    private Integer idConsBep;
    @Column(name = "energy_power")
    private Double energyPower;
    @Column(name = "start_time")
    private LocalDateTime startTime;
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "num_equipment", referencedColumnName = "id_equipment")
    @JsonBackReference
    private EquipmentBepos numEquipment;

    public ConsumptionBepos(Double energyPower, LocalDateTime startTime, EquipmentBepos numEquipment) {
        this.energyPower = energyPower;
        this.startTime = startTime;
        this.numEquipment = numEquipment;
    }
}
