package com.example.demo;

import com.example.demo.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

    private final StudentRepository repository;


    public DemoApplication(StudentRepository repository) {
        this.repository = repository;
    }


    public static void main(String[] args) {

        SpringApplication.run(DemoApplication.class, args);
    }


    @Override
    public void run(String... args) {


        System.out.println("Total students:");
        System.out.println(repository.count());


        System.out.println("All students:");
        System.out.println(repository.findAll());

    }
}