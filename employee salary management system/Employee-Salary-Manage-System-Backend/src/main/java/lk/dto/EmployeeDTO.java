//Employee-Salary-Management-System
package lk.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmployeeDTO {
    private String employeeId;
    private String employeeName;
    private String employeePosition;
}
