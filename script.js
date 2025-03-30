// Selecionando os elementos necessários
const button = document.querySelector('.button-task');
const input = document.querySelector('.input-task');
const taskList = document.querySelector('.list-task');

// Lista para armazenar as tarefas
let tasks = [];

// Função para adicionar uma nova tarefa
function addTask() {
    const taskText = input.value.trim();

    if (taskText) {  // Verifica se o input não está vazio
        tasks.push({
            text: taskText, // Tarefa com texto
            completed: false, // Tarefa ainda não concluída
        });

        input.value = '';  // Limpa o campo de input
        renderTasks();  // Re-renderiza a lista de tarefas
    }
}

// Função para exibir todas as tarefas
function renderTasks() {
    taskList.innerHTML = '';  // Limpa a lista de tarefas antes de renderizar

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        
        if (task.completed) {
            taskElement.classList.add('done'); // Adiciona a classe 'done' se a tarefa foi concluída
        }

        taskElement.innerHTML = `
            <img src="./img/checked.png" alt="Concluir tarefa" onclick="toggleCompletion(${index})">
            <p>${task.text}</p>
            <img src="./img/trash.png" alt="Deletar tarefa" onclick="deleteTask(${index})">
        `;

        taskList.appendChild(taskElement);  // Adiciona a tarefa renderizada à lista
    });

    // Salva a lista de tarefas no localStorage para persistência
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para alternar o status de conclusão de uma tarefa
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();  // Re-renderiza após alteração
}

// Função para deletar uma tarefa
function deleteTask(index) {
    tasks.splice(index, 1);  // Remove a tarefa da lista
    renderTasks();  // Re-renderiza após deleção
}

// Função para carregar as tarefas do localStorage ao carregar a página
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);  // Recupera as tarefas do localStorage
    }

    renderTasks();  // Exibe as tarefas carregadas
}

// Adiciona o evento para carregar as tarefas ao carregar a página
window.addEventListener('load', loadTasks);

// Adiciona o evento para o botão de adicionar tarefa
button.addEventListener('click', addTask);

// Adiciona o evento para permitir pressionar Enter para adicionar a tarefa
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
