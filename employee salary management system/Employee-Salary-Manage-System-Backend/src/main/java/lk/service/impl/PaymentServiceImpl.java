//Employee-Salary-Management-System
package lk.service.impl;

import lk.dto.PaymentDTO;
import lk.entity.Payment;
import lk.exception.ValidateException;
import lk.repo.PaymentRepo;
import lk.service.PaymentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public void savePayment(PaymentDTO paymentDTO) {
        if (paymentRepo.existsById(paymentDTO.getPaymentId())) {
            throw new ValidateException("Payment Already Exist");
        }
        paymentDTO.setPaymentId(genaratePayID());
        System.out.println(paymentDTO.getPaymentId()+" pid");
        paymentRepo.save(modelMapper.map(paymentDTO, Payment.class));
    }

    @Override
    public void deletePayment(String id) {
        if (!paymentRepo.existsById(id)) {
            throw new ValidateException("No Payment for Delete..!");
        }
        paymentRepo.deleteById(id);
    }

    @Override
    public void updatePayment(PaymentDTO paymentDTO) {
        if (paymentRepo.existsById(paymentDTO.getPaymentId())) {
            paymentRepo.save(modelMapper.map(paymentDTO,Payment.class));

        }
    }

    @Override
    public PaymentDTO searchPayment(String id) {
        Optional<Payment> paymentOptional = paymentRepo.findById(id);
        if (paymentOptional.isPresent()) {
            return modelMapper.map(paymentOptional.get(), PaymentDTO.class);
        }
        return null;
    }

    @Override
    public ArrayList<PaymentDTO> getAllPayment() {
        ArrayList<Payment> paymentArrayList = (ArrayList<Payment>) paymentRepo.findAll();
        return modelMapper.map(paymentArrayList, new TypeToken<ArrayList<PaymentDTO>>() {
        }.getType());
    }
    public String genaratePayID() {
        String lastID = paymentRepo.getLastID();
        if (lastID != null) {
            String[] s = lastID.split("P");
            int value = Integer.parseInt(s[1]);
            value++;
            if (value < 10) {
                return "P00" + value;
            } else if (value < 100) {
                return "P0" + value;
            } else {
                return "P" + value;
            }
        } else {
            return "P001";
        }
    }

    @Override
    public List<PaymentDTO> getPaymentByEmp(String id) {
        List<Payment> all = paymentRepo.getPaymentByEmp(id);
        return modelMapper.map(all,new TypeToken<ArrayList<PaymentDTO>>(){}.getType());
    }

}
