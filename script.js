const inputBox = document.querySelector("#inputBox");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");

let editTodo = null;

//function to add to do
addBtn.addEventListener("click", function () {
    const inputText = inputBox.value.trim();

    if (inputText.length <= 0) {
        alert("You must write something to do");
        return false;
    }

    if (addBtn.value === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";

        //adding input text to local storage
        saveLocalTodos(inputText);
    }
    else {
        const li = document.createElement("li");
        const p = document.createElement("p");

        p.innerHTML = inputText;
        li.appendChild(p);

        //creating edit img
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        //adding css class to edit btn
        editBtn.classList.add("Btn", "editBtn");
        //now appending edit button to li
        li.appendChild(editBtn);

        //creating delete img
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Remove";
        //adding css class to delete btn
        deleteBtn.classList.add("Btn", "deleteBtn");
        //now appending delete button to li
        li.appendChild(deleteBtn);

        //appending to ul
        todoList.appendChild(li);
        //we are emptying input text after adding to do list
        inputBox.value = "";

        //adding input text to local storage
        saveLocalTodos(inputText);
    }
});

//function to delete and edit list
todoList.addEventListener("click", function (e) {
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.innerHTML == "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        deleteLocalTodos(e.target.parentElement);
        inputBox.focus();//it will make the cursor focus on input box
        addBtn.value = "Edit";
        editTodo = e;
    }
});

//save to local to do
function saveLocalTodos(todo) {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    //taking previous item and passing it to array
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

//acessing local to do and displaying it on screen
function getLocalTodos() {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    //taking previous item and passing it to array
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        //now after accessing the inputText from storage we need to make li
        todos.forEach(todo => {
            const li = document.createElement("li");
            const p = document.createElement("p");

            p.innerHTML = todo;
            li.appendChild(p);

            //creating edit img
            const editBtn = document.createElement("button");
            editBtn.innerHTML = "Edit";
            //adding css class to edit btn
            editBtn.classList.add("Btn", "editBtn");
            //now appending edit button to li
            li.appendChild(editBtn);

            //creating delete img
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Remove";
            //adding css class to delete btn
            deleteBtn.classList.add("Btn", "deleteBtn");
            //now appending delete button to li
            li.appendChild(deleteBtn);

            //appending to ul
            todoList.appendChild(li);
        });

    }


}

//fn to delete local  to do
function deleteLocalTodos(todo) {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    //taking previous todos and passing it to array
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //acessing the p tag of the given li
    let todoText=todo.children[0].innerHTML;
    //now,we need to search on which index this p tag is on local storage
    let todoIndex=todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos));

}
document.addEventListener("DOMContentLoaded",getLocalTodos);


