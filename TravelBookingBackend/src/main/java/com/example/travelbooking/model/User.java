package com.example.travelbooking.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")   // "user" is reserved in MySQL, so better use "users"
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    // ===== Constructors =====
    public User() {
    }

    public User(Long id, String email, String password, String name) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    // ===== Getters & Setters =====
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
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

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

	public void setRole(String string) {
		// TODO Auto-generated method stub
		
	}

	public String getRole() {
		// TODO Auto-generated method stub
		return null;
	}
}
