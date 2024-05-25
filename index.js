const columns = document.querySelectorAll('.column');
const addTaskButton = document.getElementById('add-task');
const newTaskInput = document.getElementById('new-task');


addTaskButton.addEventListener('click', () => {
    const taskContent = newTaskInput.value.trim();
    if (taskContent !== '') {
        const card = createCard(taskContent);
        const todoColumn = document.getElementById('todo');
        todoColumn.appendChild(card);
        newTaskInput.value = '';
    }
});


const createCard = (content) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.draggable = true;
    card.textContent = content;

    card.addEventListener('dragstart', () => {
        draggedCard = card;
        setTimeout(() => {
            card.classList.add('dragging');
        }, 0);
    });

    card.addEventListener('dragend', () => {
        setTimeout(() => {
            card.classList.remove('dragging');
            draggedCard = null;
        }, 0);
    });

    return card;
};

columns.forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(column, e.clientY);
        const card = document.querySelector('.dragging');
        if (afterElement == null) {
            column.appendChild(card);
        } else {
            column.insertBefore(card, afterElement);
        }
    });
});

const getDragAfterElement = (column, y) => {
    const draggableElements = [...column.querySelectorAll('.card:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
};