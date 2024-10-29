//Employee-Salary-Management-System
package lk.service.impl;

import lk.dto.EmployeeDTO;
import lk.entity.Employee;
import lk.exception.ValidateException;
import lk.repo.EmployeeRepo;
import lk.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void saveEmployee(EmployeeDTO employeeDTO) {
        if (employeeRepo.existsById(employeeDTO.getEmployeeId())) {
            throw new ValidateException("Employee Already Exist");
        }
        employeeRepo.save(modelMapper.map(employeeDTO, Employee.class));
    }

    @Override
    public void deleteEmployee(String id) {
        if (!employeeRepo.existsById(id)) {
            throw new ValidateException("No Employee for Delete..!");
        }
        employeeRepo.deleteById(id);
    }

    @Override
    public void updateEmployee(EmployeeDTO employeeDTO) {
        if (employeeRepo.existsById(employeeDTO.getEmployeeId())) {
            employeeRepo.save(modelMapper.map(employeeDTO, Employee.class));

        }
    }

    @Override
    public EmployeeDTO searchEmployee(String id) {
        Optional<Employee> employeeOptional = employeeRepo.findById(id);
        if (employeeOptional.isPresent()) {
            return modelMapper.map(employeeOptional.get(), EmployeeDTO.class);
        }
        return null;
    }

    @Override
    public ArrayList<EmployeeDTO> getAllEmployee() {
        ArrayList<Employee> employeeArrayList = (ArrayList<Employee>) employeeRepo.findAll();
        return modelMapper.map(employeeArrayList, new TypeToken<ArrayList<EmployeeDTO>>() {
        }.getType());
    }
}
