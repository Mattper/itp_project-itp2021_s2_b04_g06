//Employee-Salary-Management-System
package lk.controller;

import lk.dto.PaymentDTO;
import lk.entity.Payment;
import lk.exception.NotFoundException;
import lk.service.PaymentService;
import lk.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/employeesystem/v1/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity savePayment(@RequestBody PaymentDTO paymentDTO) {
        if (paymentDTO.getPaymentId().trim().length() <= 0 ) {
            throw new NotFoundException("Payment id cannot be empty");
        }
        paymentService.savePayment(paymentDTO);
        return new ResponseEntity(
                new StandardResponse(
                        "201", "Done",paymentDTO), HttpStatus.CREATED);
    }
    @GetMapping(path = "/payid/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity searchPayment(@PathVariable String id) {
        PaymentDTO paymentDTO = paymentService.searchPayment(id);
        return new ResponseEntity(
                new StandardResponse(
                        "200", "Done", paymentDTO), HttpStatus.OK);
    }
    @GetMapping(path = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity searchPaymentByEmp(@PathVariable String id) {
        List<PaymentDTO> list = paymentService.getPaymentByEmp(id);
        for (PaymentDTO dto:list) {
            System.out.println(dto.getPaymentId()+"*");
        }
        return new ResponseEntity(new StandardResponse("200","Done",list),HttpStatus.OK);

    }
    @DeleteMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity deletePayment(@RequestParam String id) {
        paymentService.deletePayment(id);
        return new ResponseEntity(
                new StandardResponse(
                        "200", "Done", null), HttpStatus.OK);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity updatePayment(@RequestBody PaymentDTO paymentDTO) {
        if (paymentDTO.getPaymentId().trim().length() <= 0) {
            throw new NotFoundException("No id provided to update");
        }
        paymentService.updatePayment(paymentDTO);
        return new ResponseEntity(
                new StandardResponse(
                        "200", "Done", paymentDTO), HttpStatus.OK);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getAllPayment() {
        ArrayList<PaymentDTO> paymentDTOArrayList = paymentService.getAllPayment();
        return new ResponseEntity(
                new StandardResponse(
                        "200", "Done", paymentDTOArrayList), HttpStatus.OK);
    }
}
