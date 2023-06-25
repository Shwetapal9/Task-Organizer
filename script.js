const modal = document.querySelector('.modal');
const openModal = document.querySelector('.add-task-btn')
const closeModal = document.querySelector('.close');
const addTaskForm = document.querySelector('#add-task-form');

const myBtn = document.querySelector('#add-task-btn');

populateTask() ;

openModal.addEventListener('click', ()=>{
    modal.style.display = 'block';
});

closeModal.addEventListener('click', ()=>{
    modal.style.display = 'none';
})

//Populate task(after reload)
function populateTask(){
    let task = JSON.parse(localStorage.getItem('task'));
    
    if(task != null){
        task.forEach((item)=>{
            if(item.status === 'not-started'){
                var list = document.getElementById('not-started');    
                list.innerHTML += `
                            <li>
                                <p>${item.taskname}</p>
                                <p>${item.priority}</p>
                                <p>${item.Date}</p>
                                <p>${item.status}</p>
                            </li>`
            }
            if(item.status === 'in-progress'){
                var list = document.getElementById('in-progress');    
                list.innerHTML += `
                            <li>
                                <p>${item.taskname}</p>
                                <p>${item.priority}</p>
                                <p>${item.Date}</p>
                                <p>${item.status}</p>
                            </li>
                          `;
            }
            if(item.status === 'completed'){
                var list = document.getElementById('completed');    
                list.innerHTML += `
                            <li>
                                <p>${item.taskname}</p>
                                <p>${item.priority}</p>
                                <p>${item.Date}</p>
                                <p>${item.status}</p>
                            </li>
                          `;
            }
        });
    }
}

//Add task on board
myBtn.addEventListener('click',(event)=>{
    event.preventDefault();

    let taskName = document.getElementById('task-name').value;
    let priority = document.getElementById('priority').value;
    let dueDate = document.getElementById('due-date').value;
    let status = document.getElementById('status').value;
    addTask(taskName, priority, dueDate, status);
    taskName = '';
    priority = '';
    dueDate = ''
    status  = ''
    modal.style.display = 'none';

});

let task =[];


function addTask(taskName, priority, dueDate, status){
    if( JSON.parse(localStorage.getItem('task')) != null){
        task = JSON.parse(localStorage.getItem('task')) 
    }
    if(status === 'not-started'){
        var list = document.getElementById('not-started');
        setTask(taskName, priority, dueDate, status,list)
    }
    if(status === 'in-progress'){
        var list = document.getElementById('in-progress');
        setTask(taskName, priority, dueDate, status,list)
    }
    if(status === 'completed'){
        var list = document.getElementById('completed');
        setTask(taskName, priority, dueDate, status,list)

    }
    
}

//Add individual task
function setTask(taskName, priority, dueDate, status,list){
    
    list.innerHTML += `
                        <li>
                            <p>${taskName}</p>
                            <p>${priority}</p>
                            <p>${dueDate}</p>
                            <p>${status}</p>
                        </li>
                      `;

    const taskDetails = {
        taskname: taskName,
        priority: priority,
        Date: dueDate,
        status: status
        };

    task.push(taskDetails)
        
    localStorage.setItem('task', JSON.stringify(task));
}