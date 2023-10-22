package com.example.android;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;

import com.example.android.controller.UserController;
import com.example.android.model.User;

public class Register extends AppCompatActivity {
    private UserController userController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        Window window = getWindow();
        window.setStatusBarColor(Color.parseColor("#3498DB"));

        final Button register = (Button) findViewById(R.id.Bregister);

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                User user = new User();
                user.setName(findViewById(R.id.name).toString());
                user.setEmail(findViewById(R.id.email).toString());
                user.setPassword(findViewById(R.id.password).toString());
                userController.setUser(user);
                Intent intent = new Intent(Register.this, Login.class);
                startActivity(intent);
            }
        });
    }
}