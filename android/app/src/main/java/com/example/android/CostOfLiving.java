package com.example.android;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.Button;

public class CostOfLiving extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_costofliving);

        Window window = getWindow();
        window.setStatusBarColor(Color.parseColor("#3498DB"));

        final Button update = (Button) findViewById(R.id.bupdate);

        update.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(CostOfLiving.this, ExpenseCategory.class);
                startActivity(intent);
            }
        });

    }
}