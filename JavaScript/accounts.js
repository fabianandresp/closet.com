document.addEventListener("DOMContentLoaded", () => {
    const profilesKey = 'profilesData'; // Clave para almacenar el array de perfiles en localStorage

    // Función para cargar perfiles desde localStorage
    function loadProfiles() {
        const profiles = localStorage.getItem(profilesKey);
        return profiles ? JSON.parse(profiles) : [];
    }

    // Función para guardar perfiles en localStorage
    function saveProfiles(profiles) {
        localStorage.setItem(profilesKey, JSON.stringify(profiles));
    }

    // Cargar perfiles existentes
    const profilesData = loadProfiles();

    // Inicializar la interfaz con los perfiles existentes
    profilesData.forEach(profile => {
        if (profile.sessionId !== 'add' && profile.mainSessionId == localStorage.getItem('loggedInUser')) {
            renderProfile(profile);
        }
    });

    // Hacer las imágenes clicables
    document.querySelectorAll('.profile img').forEach(img => {
        img.addEventListener('click', (event) => {
            const sessionId = event.target.parentElement.dataset.session;

            if (sessionId === 'add') {
                addNewProfile();
            } else {
                // Guardar el perfil activo en localStorage
                localStorage.setItem('perfilActivo', sessionId);

                // Redirigir a home.html
                window.location.href = 'home.html';
            }
        });
    });

    // Función para añadir un nuevo perfil
    function addNewProfile() {
        const newProfileId = Date.now().toString(); // Generar un ID único basado en la fecha actual
        const newProfile = {
            sessionId: newProfileId,
            name: 'Nuevo Perfil',
            mainSessionId: localStorage.getItem('loggedInUser'),
            prendas: [] // Array para almacenar las prendas asociadas al perfil
        };

        profilesData.push(newProfile); // Añadir el nuevo perfil al array
        saveProfiles(profilesData); // Guardar el array actualizado en localStorage
        renderProfile(newProfile); // Renderizar el nuevo perfil en la interfaz
    }

    // Función para renderizar un perfil en la interfaz
    function renderProfile(profile) {
        const profilesContainer = document.querySelector('.profiles');
        const addProfileElement = document.querySelector('.profile[data-session="add"]');
        const profileHTML = `
            <div class="profile" data-session="${profile.sessionId}">
                <img src="images/icons/logo.jpg" alt="${profile.name}">
                <input type="text" value="${profile.name}" class="profile-name" data-profile="${profile.sessionId}">
                <button class="delete-profile">Eliminar</button>
            </div>
        `;

        // Inserta el nuevo perfil antes del perfil de "Añadir Perfil"
        addProfileElement.insertAdjacentHTML('beforebegin', profileHTML);

        // Agregar eventos al nuevo perfil
        const newProfileElement = profilesContainer.querySelector(`.profile[data-session="${profile.sessionId}"]`);
        const newInputElement = newProfileElement.querySelector('input');
        newInputElement.addEventListener('input', (event) => {
            profile.name = event.target.value;
            saveProfiles(profilesData);
        });
        newProfileElement.querySelector('img').addEventListener('click', () => {
            localStorage.setItem('perfilActivo', profile.sessionId);
            window.location.href = 'home.html';
        });
        newProfileElement.querySelector('.delete-profile').addEventListener('click', (event) => {
            deleteProfile(newProfileElement, profile.sessionId);
        });
    }

    // Función para eliminar un perfil
    function deleteProfile(profileElement, profileId) {
        profileElement.remove();
        const index = profilesData.findIndex(profile => profile.sessionId === profileId);
        if (index !== -1) {
            profilesData.splice(index, 1);
            saveProfiles(profilesData);
        }
    }

    // Agregar eventos de eliminación a los perfiles existentes
    document.querySelectorAll('.delete-profile').forEach(button => {
        const profileElement = button.parentElement;
        const profileId = profileElement.dataset.session;
        button.addEventListener('click', () => deleteProfile(profileElement, profileId));
    });
});
