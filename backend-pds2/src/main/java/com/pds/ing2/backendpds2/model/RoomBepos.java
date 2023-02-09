package com.pds.ing2.backendpds2.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="room_bepos")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RoomBepos {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id_room")
    private Integer idRoom;
    private String roomType;
    @Column(name = "id_hbt")
    private Integer idHbt;
}
