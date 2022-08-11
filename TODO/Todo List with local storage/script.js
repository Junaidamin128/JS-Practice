

let input = document.getElementById('task');
let addTask = document.getElementById('btn');
let ul = document.getElementById('list');
let taskList = [];
function render(e) {
    console.log(e);
    ul.innerHTML = '';
    e.forEach((element, index) => {
        let newEl = document.createElement('li');
        newEl.innerHTML = element + "<input type='checkbox' id = 'checkbox' onclick='remove(" + index + ")'>";
        ul.appendChild(newEl);
    });
}
function remove(ele) {
    taskList.splice(ele, 1);
    localStorage.setItem('tasks', JSON.stringify(taskList))
    render(taskList);
}
addTask.addEventListener('click', () => {
    if (input.value == '') {
        alert('Please Enter The Value');
        return;
    }
        taskList.push(input.value);
        input.value = '';
        input.focus();
        localStorage.setItem('tasks', JSON.stringify(taskList))
        render(taskList);
});
let saved = localStorage.getItem("tasks");
if (saved) {
    taskList = JSON.parse(localStorage.getItem("tasks"));
    render(taskList);
}