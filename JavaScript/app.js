// Datos de usuarios en memoria
const users = JSON.parse(localStorage.getItem('users')) || [];

// Función de login
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        limpiarReportes();
        agregarReporte('Inicio de sesion exitoso para el usuario ' + username, 'Inicio de sesion - Exitoso');
        window.location.href = 'home.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

// Función de registro
function signup(event) {
    event.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    if (username && password) {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        limpiarReportes();
        agregarReporte('Registro de usuario exitoso para el usuario ' + username, 'Registro de usuario - Exitoso');
        window.location.href = 'home.html';
    } else {
        alert('Por favor, complete todos los campos');
    }
}

// Función de logout
function logout() {
    limpiarReportes();
    window.location.href = 'index.html';
}

// Mostrar formulario de registro
function showSignupForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

// Mostrar formulario de login
function showLoginForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

// Manejo de eventos de formulario
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', signup);
    }
});

/*FUNCION PARA AGREGAR REPORTES*/
function agregarReporte(mensaje, tipo) {
    let reportes = JSON.parse(localStorage.getItem('reportes')) || [];
    let id = reportes.length + 1;
    let fecha = new Date().toLocaleString();
    reportes.push({ id, tipo, mensaje, fecha });
    localStorage.setItem('reportes', JSON.stringify(reportes));
}

/*FUNCION PARA LIMPIAR REPORTES*/
function limpiarReportes() {
    localStorage.removeItem('reportes');
}