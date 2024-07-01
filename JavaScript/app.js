// Datos de usuarios en memoria
const users = JSON.parse(localStorage.getItem('users')) || [];

// Función de login
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        window.location.href = 'homeCamisas.html';
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
        window.location.href = 'homeCamisas.html';
    } else {
        alert('Por favor, complete todos los campos');
    }
}

// Función de logout
function logout() {
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
