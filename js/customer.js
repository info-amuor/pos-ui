const createOrUpdateCustomer = () => {
    let salary = $('#salary').val();
    if (!isNaN(salary)) {
        let customerData = {
            name: $('#name').val(),
            address: $('#address').val(),
            salary: parseFloat(salary)
        }
        document.getElementById('loader').style.display='flex';
        $.ajax({
            url: 'http://localhost:8001/api/v1/customers',
            data: JSON.stringify(customerData),
            contentType: 'application/json',
            method: 'POST',
            success: (response) => {
                console.log(response);
                toastr.success('Successfully Created.')
                document.getElementById('loader').style.display='none';
            },
            error: (error) => {
                document.getElementById('loader').style.display='none';
                console.error('This is an Error', error)
                toastr.error('Error.')
            }
        });


    } else {
        alert('please insert a valid number')
    }


}
const loadData=()=>{
    document.getElementById('loader').style.display='flex';
    $.ajax({
        url: 'http://localhost:8001/api/v1/customers/list?page=0&size=10&searchText=',
        contentType: 'application/json',
        method: 'GET',
        success: (response) => {
            console.log(response);
            document.getElementById('loader').style.display='none';
        },
        error: (error) => {
            document.getElementById('loader').style.display='none';
            console.error('This is an Error', error)
            toastr.error('Error.')
        }
    });
}