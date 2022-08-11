
let save = localStorage.getItem('tasks');

console.log(save);
function myFunction() {
    var input = document.getElementById('task');
    let task = input.value
    var ul = document.getElementById('list');
    var li = document.createElement('li');
    var p = document.createElement('p');
    if (task == "") {
        window.alert("field can't be empty")
    }
    else {
        p.appendChild(document.createTextNode(task));
        var cb = document.createElement('input');
        cb.type = "checkbox";
        cb.id = "checkbox";
        li.appendChild(p);
        li.appendChild(cb);
        ul.appendChild(li);
        // localStorage.setItem('tasks', task);
        // ul.innerHTML = "<li><p>"+task+"</p><input type='checkbox' id='checked'></li>"
    }
    input.value = "";
    input.focus();
    cb.addEventListener("change", (event) => {
        if (event.currentTarget.checked) {
            li.parentNode.removeChild(li);
            // localStorage.removeItem('tasks');

        }
    })
}




// let input = document.getElementById("task");
// let btn = document.getElementById("btn");
// let ul = document.getElementById("list");
// let save = localStorage.getItem('tasks');
// console.log(save);

// btn.addEventListener('click', () => {
//     let txt = input.value;
//     if (txt == '') {
//         alert('Please Enter The Value')
//     }
//     else {
//         let li = document.createElement('li');
//         let bt = document.createElement('input');
//         bt.type = 'checkbox';
//         bt.id = 'checkbox'
//         li.appendChild(document.createTextNode(txt))
//         li.appendChild(bt);
//         ul.appendChild(li);
//         localStorage.setItem('tasks', txt);
//     }
//     input.value = '';
//     input.focus();

//     bt.addEventListener('change', (e) => {
//         if (e.currentTarget.checked) {
//             li.parentNode.removeChild(li);
//         }
//     })
// })
