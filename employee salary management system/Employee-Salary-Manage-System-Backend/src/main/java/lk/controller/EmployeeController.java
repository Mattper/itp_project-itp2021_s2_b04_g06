//Employee-Salary-Management-System
package lk.controller;

import lk.dto.EmployeeDTO;
import lk.exception.NotFoundException;
import lk.service.EmployeeService;
import lk.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping("/employeesystem/v1/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity saveEmployee(@RequestBody EmployeeDTO employeeDTO) {
        if (employeeDTO.getEmployeeId().trim().length() <= 0) {
            throw new NotFoundException("Employee id cannot be empty");
        }
        employeeService.saveEmployee(employeeDTO);
        return new ResponseEntity(
                new StandardResponse(
                        "201", "Done",employeeDTO), HttpStatus.CREATED);
    }

    @GetMapping(path = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity searchEmployee(@PathVariable String id) {
        EmployeeDTO employeeDTO = employeeService.searchEmployee(id);
        return new ResponseEntity(
                new StandardResponse(
                        "200", "Done", employeeDTO), HttpStatus.OK);
    }

    @DeleteMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity deleteEmployee(@RequestParam String id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity(
                new StandardResponse(
                        "200", "Done", null), HttpStatus.OK);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity updateEmployee(@RequestBody EmployeeDTO employeeDTO) {
        if (employeeDTO.getEmployeeId().trim().length() <= 0) {
            throw new NotFoundException("No id provided to update");
        }
        employeeService.updateEmployee(employeeDTO);
        return new ResponseEntity(
                new StandardResponse(
                        "200", "Done", employeeDTO), HttpStatus.OK);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getAllEmployee() {
        ArrayList<EmployeeDTO> employeeDTOArrayList = employeeService.getAllEmployee();
        return new ResponseEntity(
                new StandardResponse(
                        "200", "Done", employeeDTOArrayList), HttpStatus.OK);
    }
}
