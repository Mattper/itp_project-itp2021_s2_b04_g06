//Employee-Salary-Management-System
package lk.repo;

import lk.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentRepo extends JpaRepository<Payment,String> {
    @Query(value = "SELECT payment_Id FROM payment ORDER BY payment_Id DESC LIMIT 1",nativeQuery = true)
    String getLastID();

    @Query(value = "SELECT * FROM payment  WHERE employee_Id=:employeeId",nativeQuery = true)
    List<Payment> getPaymentByEmp(@Param("employeeId") String employeeId);


}
