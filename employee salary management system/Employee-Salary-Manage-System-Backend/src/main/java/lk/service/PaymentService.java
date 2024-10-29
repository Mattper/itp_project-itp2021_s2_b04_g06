//Employee-Salary-Management-System
package lk.service;

import lk.dto.PaymentDTO;
import lk.entity.Payment;

import java.util.ArrayList;
import java.util.List;

public interface PaymentService {
    void savePayment(PaymentDTO paymentDTO);
    void deletePayment(String id);
    void updatePayment(PaymentDTO paymentDTO);
    PaymentDTO searchPayment(String id);
    ArrayList<PaymentDTO> getAllPayment();
    public String genaratePayID();
    List<PaymentDTO> getPaymentByEmp(String id);
}
