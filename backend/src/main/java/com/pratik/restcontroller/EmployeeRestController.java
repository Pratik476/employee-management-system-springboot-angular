package com.pratik.restcontroller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.pratik.entity.Employee;
import com.pratik.repo.EmployeeRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/emp")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeRestController {

    @Autowired
    private EmployeeRepository employeeRepository;

   
    @GetMapping("/all")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    
    @PostMapping("/save")
    public ResponseEntity<?> saveEmployee(@Valid @RequestBody Employee employee) {

        employeeRepository.save(employee);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Employee saved successfully");
        return ResponseEntity.ok(response);
    }
   
      @Autowired
    private AuthenticationManager authenticationManager;
    
    
      @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String username,@RequestParam String password)
    {
    	try {
    	  Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    	
    	SecurityContextHolder.getContext().setAuthentication(authentication);
    	
    	Map<String, String>map=new HashMap<String, String>();
    	map.put("Message", "Loging Success");
    	
    	return ResponseEntity.ok(map);
    	}
    	catch (Exception e)
    	{
    		Map<String, String>map=new HashMap<String, String>();
    		map.put("Message", "Invalid Creadentials");
    		return ResponseEntity
    				.status(HttpStatus.UNAUTHORIZED)
    				.body(map);
    	}
    }

      @GetMapping("/{id}")
      public ResponseEntity<Employee> getEmployeeById(@PathVariable Integer id) {

          Employee employee = employeeRepository.findById(id)
                  .orElseThrow(() ->
                          new RuntimeException("Employee not found with id " + id));

          return ResponseEntity.ok(employee);
      }

      
      
   // 🔄 UPDATE employee by id
      @PutMapping("/update/{id}")
      public ResponseEntity<Employee> updateEmployee(
              @PathVariable Integer id,
              @RequestBody Employee empDetails) {

          Employee employee = employeeRepository.findById(id)
                  .orElseThrow(() ->
                          new RuntimeException("Employee not found with id " + id));

          
          employee.setName(empDetails.getName());
          employee.setEmail(empDetails.getEmail());
          employee.setSalary(empDetails.getSalary());
          employee.setAddress(empDetails.getAddress());
          employee.setGender(empDetails.getGender());
          employee.setDep(empDetails.getDep());

          Employee updatedEmployee = employeeRepository.save(employee);

          return ResponseEntity.ok(updatedEmployee);
      }

      
      
   // ❌ DELETE employee by id
      @DeleteMapping("/delete/{id}")
      public ResponseEntity<Map<String, String>> deleteEmployee(@PathVariable Integer id) {

          Employee employee = employeeRepository.findById(id)
                  .orElseThrow(() ->
                          new RuntimeException("Employee not found with id " + id));

          employeeRepository.delete(employee);

          Map<String, String> response = new HashMap<>();
          response.put("message", "Employee deleted successfully");

          return ResponseEntity.ok(response);
      }


	 
}
