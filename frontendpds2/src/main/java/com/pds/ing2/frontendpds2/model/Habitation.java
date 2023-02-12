package com.pds.ing2.frontendpds2.model;



public class Habitation  {
    private Integer id;
    private String type;
    private String adresse;
    private Integer id_user;
    //private Integer door_floor;

    public Habitation(Integer id_home, String type, String adresse, Integer id_user){
        this.id = id_home;
        this.type = type;
        this.adresse = adresse;
        this.id_user = id_user;
    }

    public Habitation(){
    }

    public Integer getId_home() {return id;}

    public void setId_home(Integer id_home) {this.id = id_home;}

    public String getType() {return type;}

    public void setType(String type) {this.type = type;}

    public String getAdress() {return adresse;}

    public void setAdress(String adresse) {this.adresse = adresse;}

    public Integer getId_user() {return id_user;}

    public void setId_user(Integer id_user) {this.id_user = id_user;}


}
