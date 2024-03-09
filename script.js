const todoForm = document.querySelector(".form");
const todoInput = document.getElementById("todo-input");
const todoBtn = document.getElementById("todo-btn");
const listElements = document.querySelector("#lists");
const messageElement = document.querySelector(".message");


//show Message
const showMessage = (value) => {
    messageElement.textContent = value;
    messageElement.classList.add("bg-success");

    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.classList.remove("bg-success");
    },1000)
}

//Delete Todo
const deleteTodo =(e) => {
    const selectElement = e.target.parentElement.parentElement.parentElement;
    listElements.removeChild(selectElement)

    const todoId = selectElement.id;
    let todos = getLocalStorageTodo();
    todos = todos.filter(todo => todo.todoId !== selectElement.id)
    localStorage.setItem("mytodos", JSON.stringify(todos));
}

//todoLists
const todoLists = (todoId,todoValue) => {
    const list = document.createElement("li");
    list.id = todoId;
    list.classList.add("list-style");
    list.innerHTML = `
        <span>${todoValue}</span>
        <sapn> 
            <button id="deleteBtn">
                <i class="fa-solid fa-trash"></i> 
            </button>
        </span>
    `
    listElements.appendChild(list);

    const deleteBtn = list.querySelector("#deleteBtn");
    deleteBtn.addEventListener("click", deleteTodo)
}
//
const getLocalStorageTodo =() => {
    return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
}
//Add Todo
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;
    //unique Id:
    const todoId = Date.now().toString();
    todoLists(todoId,todoValue);
    showMessage("Added Your Todo")
    
    const todos = getLocalStorageTodo();
    todos.push({todoId, todoValue});
    localStorage.setItem("mytodos", JSON.stringify(todos));
}

todoForm.addEventListener("submit", addTodo)