//Employee-Salary-Management-System
package lk.service;

import lk.dto.EmployeeDTO;
import java.util.ArrayList;

public interface EmployeeService {
    void saveEmployee(EmployeeDTO employeeDTO);
    void deleteEmployee(String id);
    void updateEmployee(EmployeeDTO employeeDTO);
    EmployeeDTO searchEmployee(String id);
    ArrayList<EmployeeDTO> getAllEmployee();
}
