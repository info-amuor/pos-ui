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

            for(let tempData of response.data.list){
                console.log(tempData)
                let tempRow=`<tr><td>${tempData.publicId}</td><td>${tempData.name}</td><td>${tempData.address}</td><td>${tempData.salary}</td><td>${tempData.activeState}</td><td><button class="btn btn-danger btn-sm">Delete Customer</button></td></tr>`;
                let rowData = document.createElement(tempRow);
                document.getElementById('t-body').appendChild(rowData);
            }


            document.getElementById('loader').style.display='none';
        },
        error: (error) => {
            document.getElementById('loader').style.display='none';
            console.error('This is an Error', error)
            toastr.error('Error.')
        }
    });
}