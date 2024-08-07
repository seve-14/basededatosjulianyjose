document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const appSection = document.getElementById('app-section');
    const loginForm = document.getElementById('login-form');
    const recordForm = document.getElementById('record-form');
    const recordsTable = document.getElementById('records-table').getElementsByTagName('tbody')[0];
    const loginError = document.getElementById('login-error');

    const users = {
        julian14: 'mundonet123456',
        joseacosta: 'mundonet123456'
    };

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (users[username] === password) {
            loginSection.classList.add('fade-out');
            setTimeout(() => {
                loginSection.style.display = 'none';
                appSection.style.display = 'block';
                appSection.classList.add('fade-in');
                loadRecords();
            }, 500);
        } else {
            loginError.textContent = 'Usuario o contraseña incorrectos';
        }
    });

    recordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const Ncelular = document.getElementById('Ncelular').value;
        const Servicio = document.getElementById('Servicio').value;
        const perfil = document.getElementById('perfil').value;
        const email = document.getElementById('email').value;
        const contraseña = document.getElementById('contraseña').value;
        const fecha = new Date().toLocaleDateString();

        const records = getRecords();
        records.push({ fecha, Ncelular, Servicio, perfil, email, contraseña });
        saveRecords(records);
        loadRecords();
        recordForm.reset();
    });

    function loadRecords() {
        const records = getRecords();
        recordsTable.innerHTML = '';
        
        records.forEach((record, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${record.fecha}</td>
                <td>${record.Ncelular}</td>
                <td>${record.Servicio}</td>
                <td>${record.perfil}</td>
                <td>${record.email}</td>
                <td>${record.contraseña}</td>
                <td>
                    <button class="edit btn-small" onclick="editRecord(${index})">Editar</button>
                    <button class="delete btn-small" onclick="deleteRecord(${index})">Eliminar</button>
                </td>
            `;
            
            recordsTable.appendChild(row);
        });
    }

    function saveRecords(records) {
        localStorage.setItem('records', JSON.stringify(records));
    }

    function getRecords() {
        return JSON.parse(localStorage.getItem('records')) || [];
    }

    window.editRecord = function(index) {
        const records = getRecords();
        const record = records[index];
        
        document.getElementById('Ncelular').value = record.Ncelular;
        document.getElementById('Servicio').value = record.Servicio;
        document.getElementById('perfil').value = record.perfil;
        document.getElementById('email').value = record.email;
        document.getElementById('contraseña').value = record.contraseña;
        
        recordForm.onsubmit = function(event) {
            event.preventDefault();
            record.Ncelular = document.getElementById('Ncelular').value;
            record.Servicio = document.getElementById('Servicio').value;
            record.perfil = document.getElementById('perfil').value;
            record.email = document.getElementById('email').value;
            record.contraseña = document.getElementById('contraseña').value;
            record.fecha = new Date().toLocaleDateString();
            
            records[index] = record;
            saveRecords(records);
            loadRecords();
            recordForm.reset();
            recordForm.onsubmit = addRecord;
        };
    }

    window.deleteRecord = function(index) {
        const records = getRecords();
        records.splice(index, 1);
        saveRecords(records);
        loadRecords();
    }

    function addRecord(event) {
        event.preventDefault();
        const Ncelular = document.getElementById('Ncelular').value;
        const Servicio = document.getElementById('Servicio').value;
        const perfil = document.getElementById('perfil').value;
        const email = document.getElementById('email').value;
        const contraseña = document.getElementById('contraseña').value;
        const fecha = new Date().toLocaleDateString();

        const records = getRecords();
        records.push({ fecha, Ncelular, Servicio, perfil, email, contraseña });
        saveRecords(records);
        loadRecords();
        recordForm.reset();
    }

    recordForm.onsubmit = addRecord;
});
