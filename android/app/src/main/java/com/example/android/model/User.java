package com.example.android.model;

public class User {
    private int id;
    private String name;
    private String email;
    private String password;
    private float costOfLiving;
    private float totalIncomeUser;

    public User(){
        costOfLiving = 0;
        totalIncomeUser = 0;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public float getCostOfLiving() {
        return costOfLiving;
    }

    public void setCostOfLiving(float costOfLiving) {
        this.costOfLiving = costOfLiving;
    }

    public float getTotalIncomeUser() {
        return totalIncomeUser;
    }

    public void setTotalIncomeUser(float totalIncomeUser) {
        this.totalIncomeUser = totalIncomeUser;
    }
}
