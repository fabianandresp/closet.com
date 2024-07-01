import { prendas } from "../data/ropa.js";
let windowVar;




// Verifica si estás en la página homeCamisas.html
if (window.location.pathname.endsWith('homeCamisas.html')) {
  windowVar = 3;
}
else if (window.location.pathname.endsWith('homePantalones.html')) {
  windowVar = 2;
}
else {
  windowVar = 1;
}

let prendasHTML = '';

prendas.forEach((prenda) => {
  

  if (prenda.tipoRopaId === windowVar) {
  prendasHTML += `  
  <div class="prenda-container">
    <div class="prenda-image-conainer">
      <img class="prenda-image"
        src="${prenda.image}">
    </div>

    <div class="prenda-name limit-text-to-2-lines">
      ${prenda.nombre}
    </div>


    <div class="prenda-temporada">
      ${prenda.temporada}
    </div>

    <div class="prenda-spacer"></div>

    <button class="add-button">
      Add
    </button>
  </div>
`;
}
  

});

document.querySelector('.js-prenda-grid').innerHTML = prendasHTML;



  



