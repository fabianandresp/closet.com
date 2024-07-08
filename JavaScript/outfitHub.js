import { loadFromStorage, addTo, prendas, removeFromPrendas, getPrenda } from "../data/ropa.js";
let windowVar;
let idPrenda = 0;

function displayClothingItems() {

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


  const clothingArray = JSON.parse(localStorage.getItem("prendas")) || [];
  const clothingContainer = document.querySelector(".prenda-grid");
  clothingContainer.innerHTML = ``;
  let prendasHTML = '';

  prendas.forEach(prenda => {
    const prendaId = prenda.id;

    const matchingPrenda = getPrenda(prendaId);

    if (prenda.tipoRopaId === windowVar) {
      const div = document.createElement("div");
      div.classList.add("prenda-container");
      div.classList.add("js-prenda-item-container");
      div.classList.add(`js-prenda-item-container-${matchingPrenda.id}`);
      div.innerHTML = `
          <div class="prenda-image-container">
            <img class="prenda-image" src="${matchingPrenda.image}">
          </div>
          <div class="prenda-name limit-text-to-2-lines">
            ${matchingPrenda.nombre}
          </div>
          <div class="prenda-temporada">
            ${matchingPrenda.temporada}

            <button class="btn js-corazon" data-prenda-id="${matchingPrenda.id}">
              <i class="fas fa-heart" style="color: ${matchingPrenda.favoritos ? 'red' : 'grey'};"></i>
            </button>
          </div>
          <div class="prenda-spacer"></div>
          <button class="add-button">
            Add
          </button>

          <div>
            <span class=" link-primary js-delete-link 
              js-delete-link-${matchingPrenda.id}" data-prenda-id="${matchingPrenda.id}">
              Delete
            </span>
            
            <span class="link-primary-edit js-edit-link js-open-edit-form"
              data-prenda-id="${matchingPrenda.id}" data-prenda-image="${matchingPrenda.image}" data-prenda-nombre="${matchingPrenda.nombre}" data-prenda-estado="${matchingPrenda.estado}" data-prenda-temporada="${matchingPrenda.temporada}" data-prenda-favoritos="${matchingPrenda.favoritos}">
              Edit
            </span>

            
          </div>

          
        `;
      clothingContainer.appendChild(div);
    }

  });

   // Agregar funcionalidad a los botones de corazón
   document.querySelectorAll(".js-corazon").forEach((button) => {
    button.addEventListener("click", () => {
      const icon = button.querySelector("i");
      const prendaId = button.dataset.prendaId;
      let prendas = JSON.parse(localStorage.getItem("prendas")) || [];
      const prendaIndex = prendas.findIndex(prenda => prenda.id == prendaId);

      if (prendaIndex !== -1) {
        if (icon.style.color === "red") {
          icon.style.color = "grey";
          prendas[prendaIndex].favoritos = 0;
        } else {
          icon.style.color = "red";
          prendas[prendaIndex].favoritos = 1;
        }
        localStorage.setItem("prendas", JSON.stringify(prendas));

        
      }
    });
  });


  //Borrar item de array y manda a borrar de local storage
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const prendaId = link.dataset.prendaId;
        removeFromPrendas(prendaId);
        //console.log(prendaId);
        const container = document.querySelector(
          `.js-prenda-item-container-${prendaId}`
        );
        if (container) {
          container.remove();
        }


      });

    });


  // Funcionalidad para el formulario modal (EDIT)
  document.querySelectorAll(".js-open-edit-form")
    .forEach((link) => {
      link.addEventListener('click', () => {
        modal.style.display = "block";
        document.querySelector(".titleText").innerText = "Editar prenda";

        const prendaId = link.dataset.prendaId;
        const prendaImage = link.dataset.prendaImage;
        const prendaNombre = link.dataset.prendaNombre;
        const prendaEstado = link.dataset.prendaEstado;
        const prendaTemporada = link.dataset.prendaTemporada;
        const prendaFavoritos = link.dataset.prendaFavoritos;

        // Rellenar los campos del formulario con los datos actuales
        document.getElementById("nombre").value = prendaNombre;
        document.getElementById("estado").value = prendaEstado;
        document.getElementById("temporada").value = prendaTemporada;

        const formEdit = document.getElementById("clothingForm");

        formEdit.onsubmit = function (event) {
          event.preventDefault();

          removeFromPrendas(prendaId);
            //console.log(prendaId);
            const container = document.querySelector(
              `.js-prenda-item-container-${prendaId}`
            );

          const fileInput = document.getElementById("image");
          const file = fileInput.files[0];
          const reader = new FileReader();

          reader.onloadend = function () {
            // Obtener las prendas desde localStorage
            let prendas = JSON.parse(localStorage.getItem("prendas")) || [];

            const formData = {
              id: prendaId,
              image: reader.result || prendaImage,
              nombre: document.getElementById("nombre").value || prendaNombre,
              estado: document.getElementById("estado").value || prendaEstado,
              temporada: document.getElementById("temporada").value || prendaTemporada,
              tipoRopaId: windowVar,
              usuarioId: 1,
              favoritos: prendaFavoritos
            };

            


            if (container) {
              container.remove();
            }

            loadFromStorage();
            addTo(formData);

            modal.style.display = "none";
            formEdit.reset();
            displayClothingItems();
          }

          if (file) {
            reader.readAsDataURL(file);
          } else {
            const formData = {
              id: prendaId,
              image: prendaImage,
              nombre: document.getElementById("nombre").value || prendaNombre,
              estado: document.getElementById("estado").value || prendaEstado,
              temporada: document.getElementById("temporada").value || prendaTemporada,
              tipoRopaId: windowVar,
              usuarioId: 1
            };


            loadFromStorage();
            addTo(formData);


            modal.style.display = "none";
            formEdit.reset();
            displayClothingItems();
          }
        }
      });
    });






  // Funcionalidad para el formulario modal
  const modal = document.getElementById("myModal");
  const btn = document.getElementById("openFormButton");
  const span = document.getElementsByClassName("close")[0];
  const form = document.getElementById("clothingForm");



  btn.onclick = function () {
    document.querySelector(".titleText").innerText = "Agregar Prenda";
    modal.style.display = "block";
  }

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  form.onsubmit = function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      // Obtener las prendas desde localStorage
      let prendas = JSON.parse(localStorage.getItem("prendas")) || [];

      // Encontrar el último ID utilizado y calcular el nuevo ID
      let lastId = prendas.length > 0 ? prendas[prendas.length - 1].id : 0;


      idPrenda = lastId + idPrenda + 1;
      console.log(idPrenda);


      const formData = {
        id: idPrenda,
        image: reader.result,
        nombre: document.getElementById("nombre").value,
        estado: document.getElementById("estado").value,
        temporada: document.getElementById("temporada").value,
        tipoRopaId: windowVar,
        usuarioId: 1,
        favoritos: 0
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


}
loadFromStorage();
displayClothingItems();

