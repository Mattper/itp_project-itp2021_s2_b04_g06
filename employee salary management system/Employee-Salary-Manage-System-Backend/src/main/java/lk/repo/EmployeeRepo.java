//Employee-Salary-Management-System
package lk.repo;

import lk.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee,String> {
}
