import { loadFromStorage, addTo, prendas, removeFromPrendas, getPrenda } from "../data/ropa.js";
let idPrenda = 0;

const listaPrendasOriginal = JSON.parse(localStorage.getItem("prendas"));

let listaPrendasBusqueda = [];


const inputBuscar = document.querySelector("[data-search]") || null;

if (inputBuscar != null) {
  inputBuscar.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    listaPrendasBusqueda = listaPrendasOriginal.filter(prenda => {

      return prenda.nombre.toLowerCase().includes(value);

    })
    displayClothingItems(listaPrendasBusqueda);
  })
}
function ropaTipoId(idOrName) {
  switch (idOrName) {
    case 1:
    case "1":
    case "Zapatos":
      return "Zapatos";
    case 2:
    case "2":
    case "Prenda inferior":
      return "Prenda inferior";
    case 3:
    case "3":
    case "Prenda superior":
    default:
      return "Prenda superior";
  }
}

function updateHeartIcons() {
  document.querySelectorAll('.js-corazon').forEach(button => {
    const prendaId = button.dataset.prendaId;
    const prenda = listaPrendasOriginal.find(prenda => prenda.id == prendaId);

    if (prenda) {
      const icon = button.querySelector('i');
      if (prenda.favoritos === 1) {
        icon.style.color = 'red';
      } else if (prenda.favoritos === 0){
        icon.style.color = 'grey';
      }
    }
  });
}


function displayClothingItems(listaPrendas) {


  //const clothingArray = JSON.parse(localStorage.getItem("prendas")) || [];
  const clothingContainer = document.querySelector(".prenda-grid");
  clothingContainer.innerHTML = ``;
  //let prendasHTML = '';
  console.log(listaPrendas);
  listaPrendas.forEach(prenda => {
    //const prendaId = prenda.id;

    //const matchingPrenda = getPrenda(prendaId);

    const div = document.createElement("div");
    div.classList.add("prenda-container");
    div.classList.add("js-prenda-item-container");
    div.classList.add(`js-prenda-item-container-${prenda.id}`);
    div.innerHTML = `
          <div class="prenda-image-container">
            <img class="prenda-image" src="${prenda.image}">
          </div>
          <div class="prenda-name limit-text-to-2-lines">
            ${prenda.nombre}
          </div>

          <div class="prenda-tipo limit-text-to-2-lines">
            ${ropaTipoId(prenda.tipoRopaId)}
          </div>

          <div class="prenda-temporada">
            ${prenda.temporada}

            <button class="btn js-corazon" data-prenda-id="${prenda.id}">
              <i class="fas fa-heart" style="color: ${prenda.favoritos ? 'red' : 'grey'};"></i>
            </button>
          </div>
          <div class="prenda-spacer"></div>
          <button class="add-button">
            Add
          </button>

          <div>
            <span class=" link-primary js-delete-link 
              js-delete-link-${prenda.id}" data-prenda-id="${prenda.id}">
              Borrar
            </span>
            
            <span class="link-primary-edit js-edit-link js-open-edit-form"
              data-prenda-id="${prenda.id}" data-prenda-image="${prenda.image}" data-prenda-nombre="${prenda.nombre}" data-prenda-estado="${prenda.estado}" data-prenda-temporada="${prenda.temporada}" data-prenda-favoritos="${prenda.favoritos}", data-prenda-tipo="${prenda.tipoRopaId}">
              Editar
            </span>

            
          </div>

          
        `;
    clothingContainer.appendChild(div);


  });

  

  // Agregar funcionalidad a los botones de corazón
  document.querySelectorAll(".js-corazon").forEach((button) => {
    button.addEventListener("click", () => {
      const icon = button.querySelector("i");
      const prendaId = button.dataset.prendaId;
      const prendaIndex = listaPrendasOriginal.findIndex(prenda => prenda.id == prendaId);

      if (prendaIndex !== -1) {
        if (icon.style.color === "red") {
          icon.style.color = "grey";
          listaPrendasOriginal[prendaIndex].favoritos = 0;
        } else {
          icon.style.color = "red";
          listaPrendasOriginal[prendaIndex].favoritos = 1;
        }
        localStorage.setItem("prendas", JSON.stringify(listaPrendasOriginal));
        displayClothingItems(listaPrendasOriginal);  // Refrescar la lista de prendas
      }
    });
  });


  // Agregar funcionalidad a los enlaces de eliminación
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const prendaId = link.dataset.prendaId;
  
      // Llamar a la función para eliminar la prenda del local storage
      removeFromPrendas(prendaId);
  
      // Eliminar la prenda de la listaPrendasOriginal
      const index = listaPrendasOriginal.findIndex(prenda => prenda.id == prendaId);
      if (index !== -1) {
        listaPrendasOriginal.splice(index, 1);
      }
  
      // Encontrar y eliminar el contenedor de la prenda en la interfaz
      const container = document.querySelector(`.js-prenda-item-container-${prendaId}`);
      if (container) {
        container.remove();
      }
    });
  });

  // Funcionalidad para el formulario modal (EDIT)

  document.querySelectorAll(".js-open-edit-form").forEach((link) => {
    link.addEventListener('click', () => {
      modal.style.display = "block";
      document.querySelector(".titleText").innerText = "Editar prenda";

      const prendaId = link.dataset.prendaId;
      const prendaImage = link.dataset.prendaImage;
      const prendaNombre = link.dataset.prendaNombre;
      const prendaEstado = link.dataset.prendaEstado;
      const prendaTemporada = link.dataset.prendaTemporada;
      const prendaFavoritos = link.dataset.prendaFavoritos;
      const prendaTipo = link.dataset.prendaTipo;

      console.log(prendaFavoritos);
      

      // Rellenar los campos del formulario con los datos actuales
      document.getElementById("nombre").value = prendaNombre;
      document.getElementById("estado").value = prendaEstado;
      document.getElementById("temporada").value = prendaTemporada;
      document.getElementById("tipo").value = prendaTipo;

      const formEdit = document.getElementById("clothingForm");

      formEdit.onsubmit = function (event) {
        event.preventDefault();

        removeFromPrendas(prendaId);
        const container = document.querySelector(`.js-prenda-item-container-${prendaId}`);

        const fileInput = document.getElementById("image");
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onloadend = function () {
          const formData = {
            id: prendaId,
            image: reader.result || prendaImage,
            nombre: document.getElementById("nombre").value || prendaNombre,
            estado: document.getElementById("estado").value || prendaEstado,
            temporada: document.getElementById("temporada").value || prendaTemporada,
            tipoRopaId: document.getElementById("tipo").value || prendaTipo,
            usuarioId: 1,
            favoritos: prendaFavoritos // Mantener el estado de favoritos original
          };
          console.log(prendaFavoritos);

          if (container) {
            container.remove();
          }

          addTo(formData);

          modal.style.display = "none";
          formEdit.reset();

          // Actualiza listaPrendasOriginal y vuelve a mostrar las prendas
          const index = listaPrendasOriginal.findIndex(prenda => prenda.id == prendaId);
          if (index !== -1) {
            listaPrendasOriginal[index] = formData;
          } else {
            listaPrendasOriginal.push(formData);
          }
          displayClothingItems(listaPrendasOriginal);
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
            tipoRopaId: document.getElementById("tipo").value || prendaTipo,
            usuarioId: 1,
            favoritos: prendaFavoritos // Mantener el estado de favoritos original
          };

          if (container) {
            container.remove();
          }

          addTo(formData);

          modal.style.display = "none";
          formEdit.reset();

          // Actualiza listaPrendasOriginal y vuelve a mostrar las prendas
          const index = listaPrendasOriginal.findIndex(prenda => prenda.id == prendaId);
          if (index !== -1) {
            listaPrendasOriginal[index] = formData;
          } else {
            listaPrendasOriginal.push(formData);
          }
          
          displayClothingItems(listaPrendasOriginal);
          updateHeartIcons();
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
      //let prendas = JSON.parse(localStorage.getItem("prendas")) || [];

      // Encontrar el último ID utilizado y calcular el nuevo ID
      let lastId = listaPrendas.length > 0 ? listaPrendas[listaPrendas.length - 1].id : 0;


      idPrenda = lastId + idPrenda + 1;
      console.log(idPrenda);


      const formData = {
        id: idPrenda,
        image: reader.result,
        nombre: document.getElementById("nombre").value,
        estado: document.getElementById("estado").value,
        temporada: document.getElementById("temporada").value,
        tipoRopaId: document.getElementById("tipo").value,
        usuarioId: 1,
        favoritos: 0
      };

      addTo(formData);

      modal.style.display = "none";
      form.reset();

      // Actualiza listaPrendasOriginal y vuelve a mostrar las prendas
      listaPrendasOriginal.push(formData);
      displayClothingItems(listaPrendasOriginal);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecciona una imagen.");
    }
  }




  document.addEventListener("DOMContentLoaded", () => {
    displayClothingItems(listaPrendas);
  });


}



let isVisibleInicio = false;
document.querySelector("[boton-inicio]").addEventListener("click", e => {
  if (!isVisibleInicio) {
    document.querySelector("[boton-inicio]").classList.add("menu-botones-medio-onclick");
    location.href = "/home.html";
  } else {
    document.querySelector("[boton-inicio]").classList.add("menu-botones-medio");
    location.href = "/home.html";
  }
})


let isVisibleBuscar = false;
document.querySelector("[boton-buscar]").addEventListener("click", e => {
  if (!isVisibleBuscar) {
    document.querySelector("[boton-buscar]").classList.add("menu-botones-medio-onclick");
    location.href = "/homeBuscar.html";
  } else {
    document.querySelector("[boton-buscar]").classList.add("menu-botones-medio");
    location.href = "/homeBuscar.html";
  }
})
updateHeartIcons();
loadFromStorage();
displayClothingItems(listaPrendasOriginal);

//gjjg