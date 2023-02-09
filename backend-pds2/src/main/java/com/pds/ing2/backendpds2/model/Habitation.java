package com.pds.ing2.backendpds2.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "habitation")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Habitation  {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    private String type;
    private Integer idUser;


}
