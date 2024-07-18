const getInput = document.querySelector('#todo');
const submitButton = document.querySelector('#submit');
const todoList = document.querySelector('.todo-list');

// Function to handle adding, editing, and removing todos
const manageTodo = () => {
    let value = getInput.value.trim(); // Trim whitespace from input value
    if (value) {
        // Create todo item
        let createDiv = document.createElement('div');
        createDiv.className = 'result';
        createDiv.innerHTML = `
            <div class='value'>${value}</div>
            <div class='crudButtons'>
                <button class="remove" type="button">Remove</button>
                <button class="edit" type="button">Edit</button>
            </div>
        `;
        todoList.appendChild(createDiv);

        // Show success message with SweetAlert2
        Swal.fire({
            icon: 'success',
            text: 'Value Added Successfully',
            showConfirmButton: false,
            timer: 2000
        });

        getInput.value = ''; // Clear input field after adding todo

        // Event listener for remove button
        const removeButton = createDiv.querySelector('.remove');
        removeButton.addEventListener('click', () => {
            createDiv.remove();
            Swal.fire({
                icon: 'info',
                text: 'Value Deleted',
                showConfirmButton: false,
                timer: 2000
            });
        });

        // Event listener for edit button
        const editButton = createDiv.querySelector('.edit');
        editButton.addEventListener('click', () => {
            Swal.fire({
                title: 'Edit Value',
                input: 'text',
                inputPlaceholder: 'Enter new value',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to enter something!';
                    }
                },
                showCancelButton: true,
                confirmButtonText: 'Update',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    const editPara = createDiv.querySelector('.value');
                    editPara.textContent = result.value;
                    Swal.fire({
                        icon: 'success',
                        text: 'Value Edited Successfully',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
        });
    } else {
        Swal.fire({
            icon: 'warning',
            text: 'Please Enter a Value',
            showConfirmButton: false,
            timer: 2000
        });
    }
};

// Event listener for add button
submitButton.addEventListener('click', manageTodo);
