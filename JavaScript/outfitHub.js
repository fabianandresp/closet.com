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
              Delete
            </span>
            
            <span class="link-primary-edit js-edit-link js-open-edit-form"
              data-prenda-id="${prenda.id}" data-prenda-image="${prenda.image}" data-prenda-nombre="${prenda.nombre}" data-prenda-estado="${prenda.estado}" data-prenda-temporada="${prenda.temporada}" data-prenda-favoritos="${prenda.favoritos}">
              Edit
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
      //let prendas = JSON.parse(localStorage.getItem("prendas")) || [];
      const prendaIndex = listaPrendas.findIndex(prenda => prenda.id == prendaId);

      if (prendaIndex !== -1) {
        if (icon.style.color === "red") {
          icon.style.color = "grey";
          listaPrendas[prendaIndex].favoritos = 0;
        } else {
          icon.style.color = "red";
          listaPrendas[prendaIndex].favoritos = 1;
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
            //let prendas = JSON.parse(localStorage.getItem("prendas")) || [];

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
    displayClothingItems(listaPrendas);
  });


}



let isVisibleInicio = false;
document.querySelector("[boton-inicio]").addEventListener("click", e => {
  if (!isVisibleInicio) {
    document.querySelector("[boton-inicio]").classList.add("menu-botones-medio-onclick");
    agregarReporte('Cambio de pestaña a inicio','Cambio de pestaña');
    location.href = "/home.html";
  } else {
    document.querySelector("[boton-inicio]").classList.add("menu-botones-medio");
    agregarReporte('Cambio de pestaña a inicio','Cambio de pestaña');
    location.href = "/home.html";
  }
})


let isVisibleBuscar = false;
document.querySelector("[boton-buscar]").addEventListener("click", e => {
  if (!isVisibleBuscar) {
    document.querySelector("[boton-buscar]").classList.add("menu-botones-medio-onclick");
    agregarReporte('Cambio de pestaña a buscar','Cambio de pestaña');
    location.href = "/homeBuscar.html";
  } else {
    document.querySelector("[boton-buscar]").classList.add("menu-botones-medio");
    agregarReporte('Cambio de pestaña a buscar','Cambio de pestaña');
    location.href = "/homeBuscar.html";
  }
})

loadFromStorage();
displayClothingItems(listaPrendasOriginal);

/*IR A LA PAGINA REPORTES*/
let isVisibleReportes = false;
document.querySelector("[boton-reportes]").addEventListener("click", e => {
  if (!isVisibleBuscar) {
    document.querySelector("[boton-reportes]").classList.add("menu-botones-medio-onclick");
    agregarReporte('Cambio de pestaña a reportes','Cambio de pestaña');
    location.href = "/homeReportes.html";
  } else {
    document.querySelector("[boton-reportes]").classList.add("menu-botones-medio");
    agregarReporte('Cambio de pestaña a reportes','Cambio de pestaña');
    location.href = "/homeReportes.html";
  }
})

/*FUNCION PARA AGREGAR REPORTES*/
function agregarReporte(mensaje, tipo) {
  let reportes = JSON.parse(localStorage.getItem('reportes')) || [];
  let id = reportes.length + 1;
  let fecha = new Date().toLocaleString();
  reportes.push({ id, tipo, mensaje, fecha });
  localStorage.setItem('reportes', JSON.stringify(reportes));
}