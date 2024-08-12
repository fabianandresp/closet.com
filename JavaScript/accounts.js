document.addEventListener("DOMContentLoaded", () => {
    // Cargar nombres de perfiles desde localStorage
    document.querySelectorAll('.profile-name').forEach(input => {
        const profileKey = `profileName_${input.dataset.profile}`;
        const savedName = localStorage.getItem(profileKey);
        if (savedName) {
            input.value = savedName;
        }

        // Guardar el nombre del perfil en localStorage cuando se edite
        input.addEventListener('input', (event) => {
            localStorage.setItem(profileKey, event.target.value);
        });
    });

    // Hacer las imágenes clicables
    document.querySelectorAll('.profile img').forEach(img => {
        img.addEventListener('click', (event) => {
            const sessionId = event.target.parentElement.dataset.session;

            const profileName = localStorage.getItem(`profileName_${sessionId}`);
            
            // Guardar el perfil activo en localStorage
            localStorage.setItem('perfilActivo', profileName || `Perfil ${sessionId}`);

            if (sessionId === 'add') {
                addNewProfile();
            } else {
                window.location.href = 'home.html';//`session${sessionId}.html`; // Redirige a la sesión correspondiente.
            }
        });
    });

    // Función para añadir un nuevo perfil
    function addNewProfile() {
        const profilesContainer = document.querySelector('.profiles');
        const addProfileElement = document.querySelector('.profile[data-session="add"]');
        const newProfileId = profilesContainer.children.length; // Asigna un ID único basado en la cantidad de perfiles
        const newProfileHTML = `
            <div class="profile" data-session="${newProfileId}">
                <img src="images/icons/logo.jpg" alt="Perfil ${newProfileId}">
                <input type="text" value="Nuevo Perfil" class="profile-name" data-profile="${newProfileId}">
                <button class="delete-profile">Eliminar</button>
            </div>
        `;

        // Inserta el nuevo perfil antes del perfil de "Añadir Perfil"
        addProfileElement.insertAdjacentHTML('beforebegin', newProfileHTML);

        // Agregar eventos al nuevo perfil
        const newProfileElement = profilesContainer.querySelector(`.profile[data-session="${newProfileId}"]`);
        newProfileElement.querySelector('img').addEventListener('click', () => {
            window.location.href = `session${newProfileId}.html`;
        });
        const newInputElement = newProfileElement.querySelector('input');
        newInputElement.addEventListener('input', (event) => {
            localStorage.setItem(`profileName_${newProfileId}`, event.target.value);
        });
        newProfileElement.querySelector('.delete-profile').addEventListener('click', (event) => {
            deleteProfile(newProfileElement, newProfileId);
        });
    }

    // Función para eliminar un perfil
    function deleteProfile(profileElement, profileId) {
        profileElement.remove();
        localStorage.removeItem(`profileName_${profileId}`);
    }

    // Agregar eventos de eliminación a los perfiles existentes
    document.querySelectorAll('.delete-profile').forEach(button => {
        const profileElement = button.parentElement;
        const profileId = profileElement.dataset.session;
        button.addEventListener('click', () => deleteProfile(profileElement, profileId));
    });
});
