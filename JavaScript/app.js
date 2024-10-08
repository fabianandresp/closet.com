// Datos de usuarios en memoria
const users = JSON.parse(localStorage.getItem('users')) || [];

// Función de login
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('loggedInUserName', username);
        limpiarReportes();
        window.location.href = 'homeAccounts.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

// Función de registro
function signup(event) {
    event.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    var exist = users.find(user => user.username === username);
    if (!exist) {
        if (username && password) {
            if (validarContraseña(password)) {
                const userSessionId = btoa(username);
                users.push({ username, password, userSessionId });
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('loggedInUser', userSessionId);
                localStorage.setItem('loggedInUserName', username);
                limpiarReportes();
                window.location.href = 'homeAccounts.html';
            } else {
                alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un carácter especial');
            }
        } else {
            alert('Por favor, complete todos los campos');
        }
    } else {
        alert('Nombre usuario ya se encuentra registrado');
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


function agregarReporte(mensaje, tipo) {
    const perfilActivo = localStorage.getItem('perfilActivo');
    let reportes = JSON.parse(localStorage.getItem('reportes')) || [];
  
    const nuevoReporte = {
        id: reportes.length + 1,
        tipo: tipo,
        mensaje: mensaje,
        fecha: new Date().toLocaleString(),
        perfil: perfilActivo
    };
  
    reportes.push(nuevoReporte);
    localStorage.setItem('reportes', JSON.stringify(reportes));
  }

/*FUNCION PARA LIMPIAR REPORTES*/
function limpiarReportes() {
    localStorage.removeItem('reportes');
}

function validarContraseña(contraseña) {
    // Expresión regular para validar la contraseña
    const longitudMinima = 8;
    const tieneMayuscula = /[A-Z]/.test(contraseña);
    const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contraseña);

    if (contraseña.length >= longitudMinima && tieneMayuscula && tieneCaracterEspecial) {
        return true;
    } else {
        return false;
    }
}