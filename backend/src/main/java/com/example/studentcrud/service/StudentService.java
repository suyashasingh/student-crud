package com.example.demo.service;

import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Student createStudent(Student student) {
        return repository.save(student);
    }

    // READ ALL
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student getStudentById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));
    }

    public Student updateStudent(
        Long id,
        Student student) {


        Student existingStudent =
                repository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Student not found"));


        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        return repository.save(existingStudent);
    }

    public void deleteStudent(Long id) {

        Student student = repository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Student not found"));

        repository.delete(student);
    }
}