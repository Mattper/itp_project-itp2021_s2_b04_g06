//Employee-Salary-Management-System
package lk.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Payment {
    @Id
    private String paymentId;
    private String earning;
    private String deduction;
    private double amount;
    private String date;

    @ManyToOne
    @JoinColumn(name = "employeeId", referencedColumnName = "employeeId", nullable = false)
    private Employee employee;
}
