package com.pds.ing2.frontendpds2.model;

import java.sql.Timestamp;

public class MesureBepos {

        private Integer idConsBep;
    
       
        private double energyPower;
    
        
        private Timestamp startTime;
    
       
        private boolean stateCons;

        private int numEquipment;
    
    
        public MesureBepos() {
        }
    
    
        public MesureBepos(double energy, Timestamp start, boolean state, int equip ){
            this.energyPower = energy;
            this.startTime = start;
            this.stateCons = state;
            this.numEquipment = equip;
        }
    
        public MesureBepos(Integer id, double energy, Timestamp start, boolean state, int equip  ){
            this.idConsBep = id;
            this.energyPower = energy;
            this.startTime = start;
            this.stateCons = state;
            this.numEquipment = equip;
        }
    
        public Integer getIdConsBep() {
            return idConsBep;
        }
    
    
        public void setIdConsBep(Integer idConsBep) {
            this.idConsBep = idConsBep;
        }
    
    
    
        public double getEnergyPower() {
            return energyPower;
        }
    
        public void setEnergyPower(double energyPower) {
            this.energyPower = energyPower;
        }
    
    
    
        public Timestamp getStartTime() {
            return startTime;
        }
    
        public void setStartTime(Timestamp startTime) {
            this.startTime = startTime;
        }
    
        public boolean getStateCons(){
            return stateCons;
        }
    
        public void setStateCons(boolean stateCons) {
            this.stateCons = stateCons;
        }
    
        public int getNumEquipment() {
            return numEquipment;
        }

        public void setNumEquipment(int numEquipment) {
            this.numEquipment = numEquipment;
        }
    
        
    
    
    
}
