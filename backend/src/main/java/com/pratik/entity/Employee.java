package com.pratik.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity(name="employees")
public class Employee {
 	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotBlank(message="Name can not be empty")
	@Size(min=5 , max=50, message="Name Should Be Min 5 & Max 10 Charracter")
	private String name;
	
	@Email(message="Email Not Valid")
	@NotBlank(message="Email Can Not Be Empty")
	private String email;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;


	
	@NotBlank(message="Address can not be empty")
	private String address;
	
	@NotNull(message="Salary can not be empty")
	@Positive(message="Salary Should Greater Than 0")
	private Double salary;
	
	@NotBlank(message="Dep can not be empty")
	private String dep;
	
	@NotBlank(message="Gender can not be empty")
	private String gender;
}
 