//Employee-Salary-Management-System
package lk.advisor;

import lk.exception.NotFoundException;
import lk.exception.ValidateException;
import lk.util.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AppWideExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity handleException(Exception e){
        return new ResponseEntity(
                new StandardResponse(
                        "500","Error",e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity handleNotFoundException(NotFoundException e) {
        return new ResponseEntity(
                new StandardResponse(
                        "404", "Error", e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ValidateException.class)
    public ResponseEntity handleValidationException(ValidateException e) {
        return new ResponseEntity(
                new StandardResponse(
                        "400", "Error", e.getMessage()), HttpStatus.BAD_REQUEST);
    }
}
