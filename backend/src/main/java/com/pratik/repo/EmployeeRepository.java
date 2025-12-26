package com.pratik.repo;



import org.springframework.data.jpa.repository.JpaRepository;
import com.pratik.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	 Employee findByName(String name);
}
