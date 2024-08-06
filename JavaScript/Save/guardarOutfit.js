import { closet, removeFromCloset } from "../../data/closet.js";
import { getPrenda } from "../../data/ropa.js";
import { addToClosetSaved } from "../../data/closetSaved.js";

let outfitSummaryHTML = `
    <div class="outfit-summary-title">
      Resumen Outfit 
    </div>
    `;

export function renderOutfitSummary() {

  closet.forEach((closetItem) => {
    const prenda = getPrenda(closetItem.id);

    const prendaId = closetItem.id;

    const matchingPrenda = getPrenda(prendaId);

    console.log(matchingPrenda);

    outfitSummaryHTML += `

      <div class="closet-item-container
        js-closet-item-container 
        js-closet-item-container-${matchingPrenda.id}">
        

        <div class="outfit-summary-row">
          <div class="outfit-summary">
            <img class="prenda-image-summary"
            src="${matchingPrenda.image}">
            ${matchingPrenda.nombre}
            
          </div>
        </div>
      </div>
    `;

  });

  outfitSummaryHTML += `
    <a href= "closet.html">
      <button class="place-order-button button-primary js-save-outfit">
        Guardar Outfit
      </button>
    </a>
  `;


  document.querySelector('.js-outfit-summary-final')
    .innerHTML = outfitSummaryHTML;

  document.querySelectorAll('.js-save-outfit').forEach((button) => {
    button.addEventListener('click', () => {
      const prendaIds = closet.map(item => item.id);
      addToClosetSaved(prendaIds);
      closet.forEach((closetItem) => {
        const prendaId = closetItem.id;
        removeFromCloset(prendaId);
      });
    });
  });

}