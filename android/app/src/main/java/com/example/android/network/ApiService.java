package com.example.android.network;

import com.example.android.model.User;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Body;

import java.util.List;
public interface ApiService {
    @POST("user/add")
    Call<User> setUser(@Body User user);
}
