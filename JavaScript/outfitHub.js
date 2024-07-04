import { loadFromStorage, addTo, prendas} from "../data/ropa.js";
let windowVar;

// Verifica si estás en la página homeCamisas.html

if (window.location.pathname.endsWith('homeCamisas.html')) {
  windowVar = 3;
} else if (window.location.pathname.endsWith('homePantalones.html')) {
  windowVar = 2;
} else {
  windowVar = 1;
}


/*
// Función para renderizar las prendas
function renderPrendas() {
  prendas = JSON.parse(localStorage.getItem("prendas")) || [];
  let prendasHTML = `
    <button id="openFormButton">Abrir Formulario</button>
    <div id="clothingContainer"></div>
    
    <div id="myModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <form id="clothingForm">
                <label for="id">ID:</label>
                <input type="number" id="id" name="id"><br><br>
                <label for="image">Imagen:</label>
                <input type="file" id="image" name="image"><br><br>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre"><br><br>
                <label for="estado">Estado:</label>
                <input type="text" id="estado" name="estado"><br><br>
                <label for="temporada">Temporada:</label>
                <input type="text" id="temporada" name="temporada"><br><br>
                <label for="tipoRopaId">Tipo Ropa ID:</label>
                <input type="number" id="tipoRopaId" name="tipoRopaId"><br><br>
                <label for="usuarioId">Usuario ID:</label>
                <input type="number" id="usuarioId" name="usuarioId"><br><br>
                <button type="submit" class="js-submit-button">Guardar</button>
            </form>
        </div>
    </div>
  `;

  prendas.forEach((prenda) => {
    if (prenda.tipoRopaId === windowVar) {
      prendasHTML += `  
      <div class="prenda-container">
        <div class="prenda-image-container">
          <img class="prenda-image" src="${prenda.image}">
        </div>
        <div class="prenda-name limit-text-to-2-lines">${prenda.nombre}</div>
        <div class="prenda-temporada">${prenda.temporada}</div>
        <div class="prenda-spacer"></div>
        <button class="add-button">Add</button>
      </div>
      `;
    }
  });

  document.querySelector('.js-prenda-grid').innerHTML = prendasHTML;

  // Inicializa los eventos del modal
  const modal = document.getElementById("myModal");
  const btn = document.getElementById("openFormButton");
  const span = document.getElementsByClassName("close")[0];
  const form = document.getElementById("clothingForm");

  btn.onclick = function() {
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  form.onsubmit = function(event) {
    event.preventDefault();

    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
      const formData = {
        id: document.getElementById("id").value,
        image: reader.result,
        nombre: document.getElementById("nombre").value,
        estado: document.getElementById("estado").value,
        temporada: document.getElementById("temporada").value,
        tipoRopaId: document.getElementById("tipoRopaId").value,
        usuarioId: document.getElementById("usuarioId").value
      };
      prendas = JSON.parse(localStorage.getItem("prendas")) || [];
      addTo(formData);

      modal.style.display = "none";
      form.reset();
      renderPrendas();  // Renderizar las prendas después de agregar una nueva
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecciona una imagen.");
    }
  }
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  renderPrendas()
});

*/


// Funcionalidad para el formulario modal
const modal = document.getElementById("myModal");
const btn = document.getElementById("openFormButton");
const span = document.getElementsByClassName("close")[0];
const form = document.getElementById("clothingForm");

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

form.onsubmit = function(event) {
    event.preventDefault();

    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
       // Obtener las prendas desde localStorage
      let prendas = JSON.parse(localStorage.getItem("prendas")) || [];
      
      // Encontrar el último ID utilizado y calcular el nuevo ID
      let lastId = prendas.length > 0 ? prendas[prendas.length - 1].id : 0;

        const formData = {
            id: parseInt(lastId) + 1,
            image: reader.result,
            nombre: document.getElementById("nombre").value,
            estado: document.getElementById("estado").value,
            temporada: document.getElementById("temporada").value,
            tipoRopaId: windowVar,
            usuarioId: document.getElementById("usuarioId").value
        };

        loadFromStorage();
        addTo(formData);

        modal.style.display = "none";
        form.reset();
        displayClothingItems();
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        alert("Por favor, selecciona una imagen.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayClothingItems();
});

function displayClothingItems() {
    const clothingArray = JSON.parse(localStorage.getItem("prendas")) || [];
    const clothingContainer = document.querySelector(".prenda-grid");
    clothingContainer.innerHTML = ``;

    clothingArray.forEach(prenda => {
      if (prenda.tipoRopaId === windowVar) {
        const div = document.createElement("div");
        div.classList.add("prenda-container"); 
        div.innerHTML = `
              <div class="prenda-image-container">
                <img class="prenda-image" src="${prenda.image}">
              </div>
              <div class="prenda-name limit-text-to-2-lines">${prenda.nombre}</div>
              <div class="prenda-temporada">${prenda.temporada}</div>
              <div class="prenda-spacer"></div>
              <button class="add-button">Add</button>
        `;
        clothingContainer.appendChild(div);
      }
        
    });
}