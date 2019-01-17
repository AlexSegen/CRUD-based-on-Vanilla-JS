// Add your scripts here
import UIkit from 'uikit';
import userService from '../services/user.service';
let users = [];
let table = document.getElementById('table');
var myForm = document.getElementById('myForm');
let formData = new FormData();

const listUsers = data => {
    table.innerHTML = '';
    for(const i of data) {
        table.innerHTML += `
        <tr>
        <td>${i.id}</td>
        <td>${i.first_name}</td>
        <td>${i.last_name}</td>
        <td>${i.email}</td>
        <td>
            <button class="uk-button uk-button-default">Edit</button>
            <button class="uk-button uk-button-danger --delete" ref="${i.id}">Delete</button>                      </td>
        </tr>`;
    }
};

const getUsers = () => {
    userService.get().then(data => {
        users = data;
        listUsers(users);
    });
}

const addUser = () => {

    let obj = {};

    formData = new FormData(myForm);

    for(var pair of formData.entries()) {
        obj[pair[0]] = pair[1]
    }
    
    userService.post(obj).then(data => {
        users.push(data);
        listUsers(users);
        UIkit.notification(`Usuario ${data.first_name} agregado.`);
    });
}

const deleteUser = identifier => {
    userService.remove(identifier).then(()=> { 
        users.slice(users.findIndex(i => i.id == identifier), 1);
        listUsers(users);
        UIkit.notification(`Usuario eliminado.`);
    });
}

myForm.addEventListener('submit', e => {
    e.preventDefault();
    addUser();
});


document.addEventListener('click', function(e){
    if(e.target.classList.contains('--delete')) {        
        deleteUser(e.target.getAttribute("ref"));
    }  
});

getUsers();