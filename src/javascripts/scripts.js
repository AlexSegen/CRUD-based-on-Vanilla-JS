// Add your scripts here
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons'
import userService from '../services/user.service';

UIkit.use(Icons);

let users = [];
let table = document.getElementById('table');
var myForm = document.getElementById('myForm');
let formData = new FormData();

const listUsers = data => {
    table.innerHTML = '';
    for(const i of data) {
        table.innerHTML += `
        <tr ref="${i.id}">
            <td>${i.id}</td>
            <td ref="field" data-field="first_name">${i.first_name}</td>
            <td ref="field" data-field="last_name">${i.last_name}</td>
            <td ref="field" data-field="email">${i.email}</td>
            <td>${i.active ? `<a href="#!" class="uk-icon-button uk-text-success --status" uk-icon="happy" ref="${i.id}"></a>`:`<a href="#!" class="uk-icon-button uk-text-danger --status" uk-icon="minus-circle" ref="${i.id}"></a>`}</td>
            <td>
                <a href="javascript:void(0);" class="uk-icon-button --save" uk-icon="check" style="display:none;" ref="${i.id}"></a>
                <a href="javascript:void(0);"  class="uk-icon-button --edit" uk-icon="pencil" ref="${i.id}"></a>
                <a href="javascript:void(0);"  class="uk-icon-button --delete" uk-icon="trash" ref="${i.id}"></a>
            </td>
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

    obj.active = true;
    
    userService.post(obj).then(data => {
        users.push(data);
        listUsers(users);
        UIkit.notification(`Usuario ${data.first_name} agregado.`);
    });
}

const deleteUser = identifier => {
    userService.remove(identifier).then(()=> { 
        users.splice(users.findIndex(i => i.id == identifier), 1);
        listUsers(users);
        UIkit.notification(`Usuario eliminado.`);
    });
}

const updateUser = payload => {
    return userService.put(payload).then(data => {
        
        let index = users.findIndex(i => i.id == payload.id);

        users[index] = data;

        listUsers(users);

        UIkit.notification(`Usuario actualizado.`);
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

    if(e.target.classList.contains('--status')) {

        let user = users.find(i => i.id == e.target.getAttribute("ref"));
        
        user.active = !user.active;
       
        updateUser(user);
    }

    if(e.target.classList.contains('--edit')) {
        e.target.parentElement.parentElement.querySelector('.--save').style.display = "inline-flex";
        e.target.parentElement.parentElement.querySelector('.--edit').style.display = "none";
        
        const elements = e.target.parentElement.parentElement.children;

        for(const i of elements) {

            i.getAttribute("ref") == 'field' ? i.setAttribute("contenteditable", true) : false;
        }

    }
    if(e.target.classList.contains('--save')) {
        let user = {};
        const elements = e.target.parentElement.parentElement.children;

        for (const field of elements){
            if(field.getAttribute("ref") == "field"){
                user[field.dataset.field] = field.textContent
            }
        }

        user.id = e.target.getAttribute("ref");
       
        updateUser(user).then (()=> {
            for (const field of elements){
                field.setAttribute("contenteditable", true);
            }
            e.target.parentElement.parentElement.querySelector('.--save').style.display = "none";
            e.target.parentElement.parentElement.querySelector('.--edit').style.display = "inline-flex";
        });
    }
});

getUsers();