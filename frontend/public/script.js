document.addEventListener('DOMContentLoaded', () => {
  //select all required DOM elements
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-img');
    const todosContainer = document.querySelector('.todos-container');
    const progressBar = document.getElementById('progress'); // selects inner div
    const progressNumbers = document.getElementById('numbers'); // fix typo


    //show or hide image when task add or not
    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };

    //update progressbar & numbers
    //Count total tasks and checked tasks, calculate percentage: (completedTasks / totalTasks) * 100, 
    // and set progressBar.style.width. Also updates progressNumbers.textContent.
    const updateProgress = (checkCompletion = true) => {
       const totalTasks = taskList.children.length;
       const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

        progressBar.max = totalTasks;
        progressBar.value = completedTasks; //current progress
        
        const percent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        progressBar.style.width = percent + '%'; // update the width of progressbar

         progressNumbers.textContent = `${completedTasks} / ${totalTasks}`; //show numbers

        if(checkCompletion && totalTasks > 0 && completedTasks === totalTasks){
            Confetti(); // Fire confetti when all tasks completed
        }
        
    };

  //save tasks to localstorage
    const saveTaskToLocalStorage = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        }));
        //saves your array of tasks into the browser in a format that can be read back later.only store strings
        localStorage.setItem('tasks', JSON.stringify(tasks));  //converts array yo JSON
    };

    //load tasks from localstorage on page load
    const loadTasksFromLocalStorage = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({ text, completed }) => addTask(text, completed, false));
        toggleEmptyState();
        updateProgress();
    }

    //Add a new task
    const addTask = (text, completed = false, checkCompletion = true) => {
        const taskText = text || taskInput.value.trim();
        if(!taskText){
            return;
        }
        //create list items
        const li = document.createElement('li');
        li.innerHTML = ` 
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
        <span>${taskText}</span>
        <div class="task-buttons">
        <button class="edit-btn">
            <i class="fa-solid fa-pen"></i>
        </button>
        <button class="delete-btn">
            <i class="fa-solid fa-trash"></i>
        </button>
        </div>
       `;

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');

        if(completed){
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        // Checkbox change event → mark completed and update progress
        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked); //toggle completed class
            editBtn.disabled = isChecked;  //edit desable when completed
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            updateProgress();
            saveTaskToLocalStorage();
        });

        // Edit button → move task text back to input for editing
        editBtn.addEventListener('click', () => {
            if(!checkbox.checked){
                taskInput.value = li.querySelector('span').textContent;
                li.remove();  //remove lod task
                toggleEmptyState();
                updateProgress(false);
                saveTaskToLocalStorage();
            }
        });

        //Remove tasks
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
            updateProgress();
            saveTaskToLocalStorage();
        });

        taskList.appendChild(li); //add task to list
        taskInput.value = '';   // clear input field
        toggleEmptyState();
        updateProgress(checkCompletion);
        saveTaskToLocalStorage();
    };

    // Add task on button click or Enter key
    addTaskBtn.addEventListener('click', (event) => {
        event.preventDefault(); 
        addTask();
    });
    taskInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
    });

    loadTasksFromLocalStorage();
});

// Confetti animation when all tasks are completed
//The Confetti() function uses the tsparticles library to show celebratory animation.
const Confetti = () => {
    const count = 100,  //total number of confetti particles.
  defaults = {
    origin: { y: 1 }, //starting position
  };

  //Helper function that fires a portion of confetti
function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio), //generate the animation
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}