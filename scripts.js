document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const appSection = document.getElementById('app-section');
    const loginForm = document.getElementById('login-form');
    const recordForm = document.getElementById('record-form');
    const recordsTable = document.getElementById('records-table').getElementsByTagName('tbody')[0];
    const loginError = document.getElementById('login-error');

    // Datos de inicio de sesión
    const users = {
        julian14: 'mundonet123456',
        joseacosta: 'mundonet123456'
    };

    // Verificar credenciales
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (users[username] === password) {
            loginSection.style.display = 'none';
            appSection.style.display = 'block';
            loadRecords();
        } else {
            loginError.textContent = 'Usuario o contraseña incorrectos';
        }
    });

    // Agregar registro
    recordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('email').value;

        const records = getRecords();
        records.push({ name, age, email });
        saveRecords(records);
        loadRecords();
        recordForm.reset();
    });

    // Cargar registros en la tabla
    function loadRecords() {
        const records = getRecords();
        recordsTable.innerHTML = '';
        
        records.forEach((record, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.age}</td>
                <td>${record.email}</td>
                <td>
                    <button class="edit" onclick="editRecord(${index})">Editar</button>
                    <button class="delete" onclick="deleteRecord(${index})">Eliminar</button>
                </td>
            `;
            
            recordsTable.appendChild(row);
        });
    }

    // Guardar registros en localStorage
    function saveRecords(records) {
        localStorage.setItem('records', JSON.stringify(records));
    }

    // Obtener registros de localStorage
    function getRecords() {
        return JSON.parse(localStorage.getItem('records')) || [];
    }

    // Editar registro
    window.editRecord = function(index) {
        const records = getRecords();
        const record = records[index];
        
        document.getElementById('name').value = record.name;
        document.getElementById('age').value = record.age;
        document.getElementById('email').value = record.email;
        
        recordForm.onsubmit = function(event) {
            event.preventDefault();
            record.name = document.getElementById('name').value;
            record.age = document.getElementById('age').value;
            record.email = document.getElementById('email').value;
            
            records[index] = record;
            saveRecords(records);
            loadRecords();
            recordForm.reset();
        };
    }

    // Eliminar registro
    window.deleteRecord = function(index) {
        const records = getRecords();
        records.splice(index, 1);
        saveRecords(records);
        loadRecords();
    }
});
