function getCurrentDate() {

    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return (mm + '/' + dd + '/' + yyyy);
}

document.getElementById('paymentSection').style.display = 'none';
document.getElementById('payID').style.display = 'none';
document.getElementById('payFields').style.display = 'none';


$('#employeeID').on('keyup', function (event) {
    checkEmpID();
});

$('#btnViewPayment').click(function () {
    document.getElementById('paymentSection').style.display = 'block';
    document.getElementById('empSection').style.display = 'none';
    document.getElementById('payID').style.display = 'block';
    document.getElementById('payFields').style.display = 'block';


});


$('#btnViewEmployee').click(function () {
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('empSection').style.display = 'block';
    document.getElementById('payFields').style.display = 'none';
    document.getElementById('payID').style.display = 'none';

});


function checkEmpID() {
    if (/^(EMP|emp)[1-9]{1,}$/.test($('#employeeID').val())) {
        $('#employeeID').css('border', '3px solid #0eab34');
        return true;

    } else {
        $('#employeeID').css('border', '3px solid red');
        return false;
    }
}

$('#btnEmpSearch').click(function () {
    searchEmployee();
});

//search payment by empid
$('#btnPaySearch').click(function () {
    searchEmployee();
    loadPayments();

    $('#paymentID').val("");
    $('#earning').val("");
    $('#deduction').val("");
    $('#amount').val("");
});


// search employee
function searchEmployee() {
    let employeeID = $('#employeeID').val();

    if (checkEmpID()) {
        $.ajax({
            method: "get",
            url: 'http://localhost:8080/employeesystem/v1/employee/' + employeeID,
            async: false,
            success: function (response) {
                var employee = response.data;
                console.log(employee);
                if (employee != null) {
                    $('#employeeID').val(employee.employeeId);
                    $('#employeeName').val(employee.employeeName);
                    $('#employeePosition').val(employee.employeePosition);


                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'Employee ID is not matching!',

                    })
                }
            }


        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Employee ID is not matching!',
        })
    }
}

//get all employee details
$('#btnEmpGetAll').click(function () {
    loadAllEmployees();
});


//load all payments by emp id
function loadPayments() {
    let employeeID = $('#employeeID').val();

    $('.paymentTbody').empty();
    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/employeesystem/v1/payment/" + employeeID,
        dataType: 'json',
        async: false,
        success: function (resp) {

            let response = resp.data;
            console.log(response + "+");
            for (var i in response) {
                let pid = (response[i].paymentId);
                let earning = (response[i].earning);
                let amount = (response[i].amount);
                let deduction = response[i].deduction;
                let empId = response[i].employeeId;
                let date = response[i].date;


                var row = `<tr><td>${pid}</td><td>${empId}</td><td>${earning}</td><td>${deduction}</td><td>${amount}</td><td>${date}</td></tr>`;

                $('.paymentTbody').append(row);

                $('.paymentTbody tr').css({"cursor": "pointer"});
                $('.paymentTbody tr').click(function () {

                    let id = $(this).children('td:eq(0)').text();
                    let empId = $(this).children('td:eq(1)').text();
                    let earning = $(this).children('td:eq(2)').text();
                    let deduction = $(this).children('td:eq(3)').text();
                    let amount = $(this).children('td:eq(4)').text();

                    $('#paymentID').val(id);
                    $('#employeeID').val(empId);
                    $('#earning').val(earning);
                    $('#deduction').val(deduction);
                    $('#amount').val(amount);
                    searchEmployee();


                });

            }
        }
    });
}

//get all employees
function loadAllEmployees() {
    $('.employeeTbody').empty();
    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/employeesystem/v1/employee",
        dataType: 'json',
        success: function (resp) {
            console.log(resp);
            let response = resp.data;
            for (var i in response) {
                let id = (response[i].employeeId);
                let name = (response[i].employeeName);
                let position = response[i].employeePosition;
                console.log(id);


                var row = `<tr><td>${id}</td><td>${name}</td><td>${position}</td></tr>`;

                $('.employeeTbody').append(row);

                $('.employeeTbody tr').css({"cursor": "pointer"});
                $('.employeeTbody tr').click(function () {

                    let id = $(this).children('td:eq(0)').text();
                    let name = $(this).children('td:eq(1)').text();
                    let position = $(this).children('td:eq(2)').text();

                    $('#employeeID').val(id);
                    $('#employeeName').val(name);
                    $('#employeePosition').val(position);


                });

            }
        }
    });
}

//get all employee details
$('#btnPayGetAll').click(function () {
    loadAllPayments();
});

//get all payments
function loadAllPayments() {
    $('.paymentTbody').empty();
    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/employeesystem/v1/payment",
        dataType: 'json',
        async: false,
        success: function (resp) {

            let response = resp.data;
            console.log(response);
            for (var i in response) {
                let pid = (response[i].paymentId);
                let earning = (response[i].earning);
                let amount = (response[i].amount);
                let deduction = response[i].deduction;
                let empId = response[i].employeeId;
                let date = response[i].date;


                var row = `<tr><td>${pid}</td><td>${empId}</td><td>${earning}</td><td>${deduction}</td><td>${amount}</td><td>${date}</td></tr>`;

                $('.paymentTbody').append(row);

                $('.paymentTbody tr').css({"cursor": "pointer"});
                $('.paymentTbody tr').click(function () {

                    let id = $(this).children('td:eq(0)').text();
                    let empId = $(this).children('td:eq(1)').text();
                    let earning = $(this).children('td:eq(2)').text();
                    let deduction = $(this).children('td:eq(3)').text();
                    let amount = $(this).children('td:eq(4)').text();

                    $('#paymentID').val(id);
                    $('#employeeID').val(empId);
                    $('#earning').val(earning);
                    $('#deduction').val(deduction);
                    $('#amount').val(amount);
                    searchEmployee();


                });

            }
        }
    });
}


// save employee
$('#btnEmpSave').click(function () {
    let employeeID = $('#employeeID').val();
    let employeeName = $('#employeeName').val();
    let employeePosition = $('#employeePosition').val();

    if (checkEmpID()) {
        if (checkEmpName()) {
            if (checkEmpPosition()) {
                $.ajax({
                    method: "get",
                    url: 'http://localhost:8080/employeesystem/v1/employee/' + employeeID,
                    async: false,
                    success: function (response) {
                        var employee = response.data;
                        console.log(employee);
                        if (employee == null) {
                            $.ajax({
                                method: "post",
                                url: "http://localhost:8080/employeesystem/v1/employee",
                                contentType: "application/json",
                                async: false,
                                data: JSON.stringify(
                                    {
                                        employeeId: employeeID,
                                        employeeName: employeeName,
                                        employeePosition: employeePosition,

                                    }
                                ),
                                success: function (data) {

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Done..!',
                                        text: 'Process Success...!',

                                    });
                                    loadAllEmployees();

                                }
                            });


                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Oops...',
                                text: 'Employee ID Already Exists!',

                            });
                            status = true;
                        }
                    }


                });

            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Employee Position is not matching!',
                })
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Employee Name is not matching!',
            })
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Employee ID is not matching!',
        })
    }

});

//update employee
$('#btnEmpUpdate').click(function () {
    let employeeID = $('#employeeID').val();
    let employeeName = $('#employeeName').val();
    let employeePosition = $('#employeePosition').val();

    if (checkEmpID()) {
        if (checkEmpName()) {
            if (checkEmpPosition()) {
                $.ajax({
                    method: "put",
                    url: "http://localhost:8080/employeesystem/v1/employee",
                    contentType: "application/json",
                    async: false,
                    data: JSON.stringify(
                        {
                            employeeId: employeeID,
                            employeeName: employeeName,
                            employeePosition: employeePosition,

                        }
                    ),
                    success: function (data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Done..!',
                            text: 'Process Success...!',
                        });
                        loadAllEmployees();

                    }
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Employee Position is not matching!',
                })
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Employee Name is not matching!',
            })
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Employee ID is not matching!',
        })
    }

});

//delete employee
$('#btnEmpDelete').click(function () {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            let id = $("#employeeID").val();
            if (checkEmpID()) {
                $.ajax({
                    method: "delete",
                    url: 'http://localhost:8080/employeesystem/v1/employee/?id=' + id,
                    async: true,
                    success: function (response) {

                        Swal.fire(
                            'Deleted!',
                            'Driver Delete Successfully...',
                            'success'
                        );
                        loadAllEmployees();
                    },
                    error: function (response) {
                        Swal.fire(
                            'Deleted!',
                            'Cannot Found this ID',
                            'error'
                        )
                    }
                });
            } else {
                $('#driverID').css('border', '3px solid red');
            }

        }
    });


});

// __________________________Payment section______________________________

// save payment
$('#btnPaySave').click(function () {
    let employeeID = $('#employeeID').val();
    let earning = $('#earning').val();
    let deduction = $('#deduction').val();
    let amount = $('#amount').val();

    if (checkEmpID()) {
        if (checkAmount()) {
            if (checkEarning()) {
                $.ajax({
                    method: "get",
                    url: 'http://localhost:8080/employeesystem/v1/employee/' + employeeID,
                    async: false,
                    success: function (response) {
                        var employee = response.data;
                        console.log(employee);
                        if (employee != null) {
                            $('#employeeID').val(employee.employeeId);
                            $('#employeeName').val(employee.employeeName);
                            $('#employeePosition').val(employee.employeePosition);
                            $.ajax({
                                method: "post",
                                url: "http://localhost:8080/employeesystem/v1/payment",
                                contentType: "application/json",
                                async: false,
                                data: JSON.stringify(
                                    {
                                        paymentId: "P000",
                                        employeeId: employeeID,
                                        earning: earning,
                                        amount: amount,
                                        deduction: deduction,
                                        date: getCurrentDate(),

                                    }
                                ),
                                success: function (data) {

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Done..!',
                                        text: 'Process Success...!',

                                    });
                                    $('#paymentID').val("");
                                    loadPayments();
                                    clearPayment();

                                }
                            })


                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Oops...',
                                text: 'Employee ID is not matching!',

                            })
                        }
                    }


                });

            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Employee Position is not matching!',
                })
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Employee Name is not matching!',
            })
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Employee ID is not matching!',
        })
    }

});

// update payment
$('#btnPayUpdate').click(function () {
    let payId = $('#paymentID').val();
    let employeeID = $('#employeeID').val();
    let earning = $('#earning').val();
    let deduction = $('#deduction').val();
    let amount = $('#amount').val();

    if (checkEmpID()) {
        if (checkAmount()) {
            if (checkEarning()) {
                $.ajax({
                    method: "put",
                    url: "http://localhost:8080/employeesystem/v1/payment",
                    contentType: "application/json",
                    async: false,
                    data: JSON.stringify(
                        {
                            paymentId: payId,
                            employeeId: employeeID,
                            earning: earning,
                            amount: amount,
                            deduction: deduction,
                            date: getCurrentDate(),

                        }
                    ),
                    success: function (data) {
                        console.log("-----------" + data.data)

                        Swal.fire({
                            icon: 'success',
                            title: 'Done..!',
                            text: 'Process Success...!',

                        });
                        loadPayments();
                        clearPayment();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: "Earning Field Doesn't match!",
                })
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Amount is not matching!',
            })
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Employee ID is not matching!',
        })
    }

});

//clear payment fields
function clearPayment() {

    $('#paymentID').val("");
    $('#earning').val("");
    $('#deduction').val("");
    $('#amount').val("");
    $('#employeeID').val("");
    $('#employeeName').val("");
    $('#employeePosition').val("");
}

$('#btnClear').click(function () {
    clearPayment();
});

//delete payment
$('#btnPayDelete').click(function () {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            let id = $("#paymentID").val();
            if (id != null) {
                $.ajax({
                    method: "delete",
                    url: 'http://localhost:8080/employeesystem/v1/payment/?id=' + id,
                    async: true,
                    success: function (response) {

                        Swal.fire(
                            'Deleted!',
                            'Driver Delete Successfully...',
                            'success'
                        );
                        loadAllEmployees();
                        clearPayment();
                    },
                    error: function (response) {
                        Swal.fire(
                            'Deleted!',
                            'Cannot Found this ID',
                            'error'
                        )
                    }
                });
            } else {
                $('#paymentID').css('border', '3px solid red');
            }

        }
    });


});


//check amount
function checkEarning() {
    if (/^[A-z ]{1,}$/.test($('#earning').val())) {
        $('#earning').css('border', '3px solid #0eab34');
        return true;
    } else {
        $('#earning').css('border', '3px solid red');
    }
    return false;
}

$('#earning').on('keyup', function (event) {
    checkEarning();
});


//check amount
function checkAmount() {
    if (/^[0-9. ]{1,}$/.test($('#amount').val())) {
        $('#amount').css('border', '3px solid #0eab34');
        return true;
    } else {
        $('#amount').css('border', '3px solid red');
    }
    return false;
}

$('#amount').on('keyup', function (event) {
    checkAmount();
});

//check employee name
function checkEmpName() {
    if (/^[A-z ]{1,}$/.test($('#employeeName').val())) {
        $('#employeeName').css('border', '3px solid #0eab34');
        return true;
    } else {
        $('#employeeName').css('border', '3px solid red');
    }
    return false;
}

$('#employeeName').on('keyup', function (event) {
    checkEmpName();
});

//check employee position
function checkEmpPosition() {
    if (/^[A-z ]{1,}$/.test($('#employeePosition').val())) {
        $('#employeePosition').css('border', '3px solid #0eab34');
        return true;
    } else {
        $('#employeePosition').css('border', '3px solid red');
    }
    return false;
}

$('#employeePosition').on('keyup', function (event) {
    checkEmpPosition();
});
