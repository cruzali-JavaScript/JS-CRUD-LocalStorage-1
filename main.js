console.log("Soy JS");

document.onload = ReadData();

function validateForm()
{
    let email = document.getElementById('email').value;
    let nombre = document.getElementById('nombre').value;
    let telefono = document.getElementById('telefono').value;

    if (email == "") {
        alert('El campo email es requerido');
        return false;
    } else if (!email.includes('@')) {
        alert('El correo no es valido');
        return false;
    }

    if (nombre == ""){
        alert('El campo nombre es requerido');
        return false;
    }

    if (telefono == ""){
        alert('El campo telefono es requerido');
        return false;
    }
}


function ReadData()
{
    console.log("ReadData");
    let listPeople;

    if (localStorage.getItem('listPeople') == null)
    {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    var html = "";

    listPeople.forEach(function(element, index) {
        html += "<tr>";
        html += "<td>" + element.email +"</td>";
        html += "<td>" + element.nombre + "</td>";
        html += "<td>" + element.telefono + "</td>";
        html += "<td><button onclick='deleteData("+ index + ")' class='btn btn-danger'>Eliminar</button> <button onclick='editData("+ index +")' class='btn btn-warning'>Editar</button> </td>";        
        html += "</tr>";
    })

    document.querySelector('#table').innerHTML = html;
}



function AddData()
{
    console.log("AddData");
    if (validateForm() == true)
    {
        let email = document.getElementById('email').value;
        let nombre = document.getElementById('nombre').value;
        let telefono = document.getElementById('telefono').value;

        var listPeople;

        if (localStorage.getItem('listPeople') == null)
        {
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }

        listPeople.push({
            email: email,
            name: nombre,
            telefono: telefono,
        });

        localStorage.setItem('listPeople', JSON.stringify(listPeopel));

        ReadData();

        document.getElementById('email').value = ""
        
        document.getElementById('nombre').value = ""
        
        document.getElementById('telefono').value = "";

    }

}


function deleteData(index)
{
    let listPeople;

    if (localStorage.getItem('listPeople') == null)
    {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    listPeople.splice(index, 1);

    localStorage.setItem('listPeople', JSON.stringify(listPeople));

    ReadData();
}


function editData()
{
    document.getElementById('updateData').style.display = none;
    document.getElementById('enviarData').style.display = block;

    let listPeople;

    if (localStorage.getItem('listPeople') == null)
    {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    document.getElementById('email').value = listPeople[index].email;
    document.getElementById('nombre').value = listPeople[index].nombre;
    document.getElementById('telefono').value = listPeople[index].telefono;

    document.querySelector('#enviarData').onclick = function() {
        if (validateForm() == true) {
            listPeople[index].email = document.getElementById('email');
            listPeople[index].nombre = document.getElementById('nombre');
            listPeople[index].telefono = document.getElementById('telefono');

            localStorage.setItem('listPeople', JSON.stringify(listPeople));

            ReadData();

            document.getElementById('email').value = "";
            document.getElementById('nombre').value = "";
            document.getElementById('telefono').value = "";

            document.getElementById('enviarData').style.display = block;
            document.getElementById('updateData').style.display = none;
        }
    }

}
