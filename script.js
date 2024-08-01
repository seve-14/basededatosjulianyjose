document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('crudForm');
    const tableBody = document.getElementById('crudTableBody');
    const indexInput = document.getElementById('index');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const emailInput = document.getElementById('email');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = nameInput.value;
        const age = ageInput.value;
        const email = emailInput.value;
        const index = indexInput.value;

        if (index === '') {
            addRecord(name, age, email);
        } else {
            updateRecord(index, name, age, email);
        }

        form.reset();
        indexInput.value = '';
        renderTable();
    });

    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit')) {
            const index = event.target.getAttribute('data-index');
            editRecord(index);
        } else if (event.target.classList.contains('delete')) {
            const index = event.target.getAttribute('data-index');
            deleteRecord(index);
        }
    });

    function addRecord(name, age, email) {
        const records = getRecords();
        records.push({ name, age, email });
        localStorage.setItem('crudRecords', JSON.stringify(records));
    }

    function updateRecord(index, name, age, email) {
        const records = getRecords();
        records[index] = { name, age, email };
        localStorage.setItem('crudRecords', JSON.stringify(records));
    }

    function deleteRecord(index) {
        const records = getRecords();
        records.splice(index, 1);
        localStorage.setItem('crudRecords', JSON.stringify(records));
        renderTable();
    }

    function editRecord(index) {
        const records = getRecords();
        const record = records[index];
        indexInput.value = index;
        nameInput.value = record.name;
        ageInput.value = record.age;
        emailInput.value = record.email;
    }

    function getRecords() {
        return JSON.parse(localStorage.getItem('crudRecords')) || [];
    }

    function renderTable() {
        const records = getRecords();
        tableBody.innerHTML = '';
        records.forEach((record, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.age}</td>
                <td>${record.email}</td>
                <td class="actions">
                    <button class="edit" data-index="${index}">Editar</button>
                    <button class="delete" data-index="${index}">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderTable();
});