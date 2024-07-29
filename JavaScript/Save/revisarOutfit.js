import { closet, removeFromCloset } from "../../data/closet.js";
import { getPrenda } from "../../data/ropa.js";



export function renderOutfit() {
  let closetSummaryHTML = '';


  closet.forEach((closetItem) => {
    const prendaId = closetItem.id;

    const matchingPrenda = getPrenda(prendaId);

    console.log(matchingPrenda);

    closetSummaryHTML += `
      <div class="closet-item-container
        js-closet-item-container 
        js-closet-item-container-${matchingPrenda.id}">
        

        <div class="closet-item-details-grid">
          <img class="prenda-image"
            src="${matchingPrenda.image}">

          <div class="closet-item-details">
            <div class="prenda-name">
              ${matchingPrenda.nombre}
            </div> 
          </div>

          <div class="closet-item-details">
            <div class="prenda-temporada">
              ${matchingPrenda.temporada}
            </div>
            
            <div class="prenda-quantity
              js-prenda-quantity-${matchingPrenda.id}">
              
              <span class="delete-quantity-link link-primary js-delete-link
                js-delete-link-${matchingPrenda.id}"
                data-prenda-id="${matchingPrenda.id}">
                Borrar
              </span>
          </div>

        </div>
      </div>
    `;
  });


  document.querySelector('.js-outfit-summary')
    .innerHTML = closetSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const prendaId = link.dataset.prendaId;
        removeFromCloset(prendaId);

        const container = document.querySelector(
          `.js-closet-item-container-${prendaId}`
        );
        container.remove();

      });
    });
}