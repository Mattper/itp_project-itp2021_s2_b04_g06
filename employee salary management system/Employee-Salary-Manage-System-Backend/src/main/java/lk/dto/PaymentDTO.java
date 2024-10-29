//Employee-Salary-Management-System
package lk.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaymentDTO {
    private String paymentId;
    private String earning;
    private String deduction;
    private double amount;
    private String date;
    private String employeeId;
}
