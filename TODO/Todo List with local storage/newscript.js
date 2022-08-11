let input = document.getElementById('task');
let addTask = document.getElementById('btn');
let ul = document.getElementById('list');

//TODO storage
const TODOS = {
    storageID: "tasks",
    taskList: [],
    init: function () {
        this.taskList = this.getTaskList();
    },
    getTaskList: function () {
        let taskList = localStorage.getItem(this.storageID);
        if (taskList) {
            return JSON.parse(taskList);
        } else {
            return [];
        }
    },
    setTaskList: function (taskList) {
        localStorage.setItem(this.storageID, JSON.stringify(taskList));
    },
    addTodo: function (text) {
        this.taskList.push(text);
        this.setTaskList(this.taskList);
    },
    removeTodo: function (index) {
        this.taskList.splice(index, 1);
        this.setTaskList(this.taskList);
    }
};
//init TODOS
TODOS.init();

render(TODOS.taskList);


function render(e) {
    ul.innerHTML = '';
    e.forEach((element, index) => {
        let newEl = document.createElement('li');
        newEl.innerHTML = element + `<input type='checkbox' class='checkbox' onclick='TODOS.removeTodo(${index});render(TODOS.taskList);'>`;
        ul.appendChild(newEl);
    });
}

addTask.addEventListener('click', () => {
    if (input.value == '') {
        alert('Please Enter The Value');
        return;
    }
    
    TODOS.addTodo(input.value);
    render(TODOS.taskList);
});

