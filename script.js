let currentFilter = "all";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){
    saveTasks();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value
    const dueDate = document.getElementById("dueDate").value

    if(title === ""){
        alert("Please enter the task");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        status: "pending"
    };

    tasks.push(task);
    renderTasks(tasks);
    updateStats();

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";

}

function renderTasks(taskArray) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Purana list clear karo

  taskArray.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";

    // Agar task completed hai toh CSS class add karo
    if (task.status === "completed") {
      li.classList.add("completed");
    } 

    // Task ka HTML structure
    li.innerHTML = `
      <strong>${task.title}</strong> - ${task.description} 
      <br> Due: ${task.dueDate || "No date"}
      <br>
      <button onclick="markCompleted(${task.id})">Complete</button>
      <button onclick="markPending(${task.id})">Pending</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskList.appendChild(li);
  });
}

function markCompleted(id){
    saveTasks();
    tasks = tasks.map(task =>
        task.id === id? {...task , status: "completed"} : task
    );
    renderTasks(tasks);
    updateStats();
}

function markPending(id){
    saveTasks();
    tasks = tasks.map(task =>
        task.id === id? {...task , status: "pending"} : task
    );
    renderTasks(tasks);
    updateStats();
}

function deleteTask(id){
    saveTasks();
    tasks = tasks.filter(task => task.id !==id);
    renderTasks(tasks);
    updateStats(); 
}

function updateStats(){
    document.getElementById("totalTasks").innerText = "Total:" + tasks.length;
    document.getElementById("completedTasks").innerText = "Completed:" + tasks.filter(t => t.status === "completed").length;
    document.getElementById("pendingTasks").innerText = "Pending:" + tasks.filter(t => t.status === "pending").length;
}


function showAll(){
    renderTasks(tasks);
}

function showCompleted(){
    renderTasks(tasks.filter(t => t.status === "completed"));
}

function showPending(){
    renderTasks(tasks.filter(t => t.status === "pending"));
}

renderTasks(tasks);
updateStats();