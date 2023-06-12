const createOrUpdateCustomer = () => {
    let salary = $('#salary').val();
    if (!isNaN(salary)) {
        let customerData = {
            name: $('#name').val(),
            address: $('#address').val(),
            salary: parseFloat(salary)
        }
        document.getElementById('loader').style.display = 'flex';
        $.ajax({
            url: 'http://localhost:8001/api/v1/customers',
            data: JSON.stringify(customerData),
            contentType: 'application/json',
            method: 'POST',
            success: (response) => {
                console.log(response);
                toastr.success('Successfully Created.')
                document.getElementById('loader').style.display = 'none';
            },
            error: (error) => {
                document.getElementById('loader').style.display = 'none';
                console.error('This is an Error', error)
                toastr.error('Error.')
            }
        });


    } else {
        alert('please insert a valid number')
    }


}

let page=0;
let size=10;

const loadData = (page,size) => {
    document.getElementById('loader').style.display = 'flex';
    $.ajax({
        url: 'http://localhost:8001/api/v1/customers/list?page=0&size=10&searchText=',
        contentType: 'application/json',
        method: 'GET',
        success: (response) => {
            console.log(response);
            let data = response.data.list;
            displayData(data);


          /*  $('#pagination-context').pagination({
                dataSource:response.data.dataCount,
                pageSize:size,
                pageNumber:page,
                callback:function (data,pagination){
                    page = pagination.pageNumber;
                    loadData(page,size);
                }
            });*/


        },
        error: (error) => {
            document.getElementById('loader').style.display = 'none';
            console.error('This is an Error', error)
            toastr.error('Error.')
        }
    });
}

function displayData(data) {
    $('#t-body').empty();
    data.forEach((record) => {
        let btn = $('<button>').text('Delete Customer');
        btn.addClass('btn');
        btn.addClass('btn-danger');
        btn.addClass('btn-sm');

        btn.click(() => {
            deleteCustomer(record.publicId);
        })

        let row = $('<tr>');
        let cell1 = $('<td>').text(record.publicId)
        let cell2 = $('<td>').text(record.name)
        let cell3 = $('<td>').text(record.address)
        let cell4 = $('<td>').text(record.salary)
        let cell5 = $('<td>').text(record.activeState)
        let cell6 = $('<td>').append(btn);

        row.append(cell1, cell2, cell3, cell4, cell5, cell6);
        $('#t-body').append(row)
    })

    document.getElementById('loader').style.display = 'none';
}

function deleteCustomer(id) {
    document.getElementById('loader').style.display = 'flex';
    $.ajax({
        url: 'http://localhost:8001/api/v1/customers?id='+id,
        contentType: 'application/json',
        method: 'DELETE',
        success: (response) => {
            toastr.success('Successfully Deleted.')
            loadData(page,size);
        },
        error: (error) => {
            document.getElementById('loader').style.display = 'none';
            console.error('This is an Error', error)
            toastr.error('Error.')
        }
    });
}


















/*  for(let tempData of response.data.list){
                 console.log(tempData)

                 let tBody = document.getElementById('t-body');
                 let row = tBody.insertRow();

                 let cel1 = row.insertCell();
                 let cel2 = row.insertCell();
                 let cel3 = row.insertCell();
                 let cel4 = row.insertCell();
                 let cel5 = row.insertCell();
                 let cel6 = row.insertCell();

                 let btn = document.createElement('button');
                 btn.textContent='Delete';
                 cel6.appendChild(btn);

                 btn.addEventListener('click', ()=>{
                     alert('delete');
                 })

                 cel1.textContent=`${tempData.publicId}`;
                 cel2.textContent=`${tempData.name}`;
                 cel3.textContent=`${tempData.address}`;
                 cel4.textContent=`${tempData.salary}`;
                 cel5.textContent=`${tempData.activeState}`;

             }*/