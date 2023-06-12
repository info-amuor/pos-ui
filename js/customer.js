const createOrUpdateCustomer = () => {
    let salary = $('#salary').val();
    if (!isNaN(salary)) {
        let customerData = {
            name: $('#name').val(),
            address: $('#address').val(),
            salary: parseFloat(salary)
        }

        $.ajax({
            url: 'http://localhost:8001/api/v1/customers',
            data: JSON.stringify(customerData),
            contentType: 'application/json',
            method: 'POST',
            success: (response) => {
                console.log(response);
            },
            error: (error) => {
                console.error('This is an Error', error)
            }
        });


    } else {
        alert('please insert a valid number')
    }


}