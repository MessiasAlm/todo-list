const input = document.querySelector("#input");
const button = document.querySelector("#button");
const taskList = document.querySelector("#taskList");

//envia o valor do input ao clicar enter
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTaskToArray()
    }
});

// Carrega as tarefas do localStorage ao iniciar
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTaskToArray() {
    // Atualize a estrutura do array de tarefas para armazenar o estado de conclusão
    if (input.value.trim() === '') return;
    tasks.push({ text: input.value, completed: false });
    saveTasks();
    displayTasks();
    input.value = '';
}

function displayTasks() {
    let newLi = ''

    for (let index = 0; index < tasks.length; index++) {
        //console.log(`Índice ${index} ${tasks[index]}`)
        // Adiciona a classe 'completed' se a tarefa estiver marcada como completa
        const isCompleted = tasks[index].completed ? 'completed' : '';

        newLi = newLi + `<li class="${isCompleted}">
        <div class="div-input">
            <input class="input-checkbox" type="checkbox" onclick="completeItem(${index})" ${tasks[index].completed ? 'checked' : ''}>
        </div>
                <p id="paragraph">${tasks[index].text}</p>
                <img class="icon-trash" src="icons/trash.svg" alt="trash" onclick="deleteItem(${index})">
            </li>`
    }

    taskList.innerHTML = newLi;
}

function completeItem(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function deleteItem(index) {
    tasks.splice(index, 1)
    saveTasks();
    displayTasks()
}

// Salva as tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

displayTasks();
