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

let page = 0;
let size = 10;

const loadData = (page, size) => {
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
        let btnDelete = $('<button>').text('Delete Customer');
        let btnUpdate = $('<button>').text('Update Customer');
        btnDelete.addClass('btn');
        btnDelete.addClass('btn-danger');
        btnDelete.addClass('btn-sm');
        btnUpdate.addClass('btn');
        btnUpdate.addClass('btn-warning');
        btnUpdate.addClass('btn-sm');

        btnDelete.click(() => {
            if (confirm('are you sure?')) {
                deleteCustomer(record.publicId);
            }
        })
        btnUpdate.click(() => {
            setDataForCustomer(record);
        })

        let row = $('<tr>');
        let cell1 = $('<td>').text(record.publicId)
        let cell2 = $('<td>').text(record.name)
        let cell3 = $('<td>').text(record.address)
        let cell4 = $('<td>').text(record.salary)
        let cell5 = $('<td>').text(record.activeState)
        let cell6 = $('<td>').append(btnDelete);
        let cell7 = $('<td>').append(btnUpdate);

        row.append(cell1, cell2, cell3, cell4, cell5, cell6, cell7);
        $('#t-body').append(row)
    })

    document.getElementById('loader').style.display = 'none';
}

function deleteCustomer(id) {
    document.getElementById('loader').style.display = 'flex';
    $.ajax({
        url: 'http://localhost:8001/api/v1/customers?id=' + id,
        contentType: 'application/json',
        method: 'DELETE',
        success: (response) => {
            toastr.success('Successfully Deleted.')
            loadData(page, size);
        },
        error: (error) => {
            document.getElementById('loader').style.display = 'none';
            console.error('This is an Error', error)
            toastr.error('Error.')
        }
    });
}

let publicId = undefined;

function setDataForCustomer(data) {
    publicId = data.publicId;
    let btn = $('#saveOrUpdateButton');
    btn.removeClass('btn-primary');
    btn.addClass('btn-success');
    btn.html('Update Customer : ('+data.publicId+')');
    //document.getElementById('saveOrUpdateButton').innerHTML='Update Customer : ('+data.publicId+')'
    console.log(btn.text());

    $('#name').val(data.name);
    $('#address').val(data.address);
    $('#salary').val(data.salary);
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