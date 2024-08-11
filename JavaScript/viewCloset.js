import { getPrenda } from "../../data/ropa.js";
import { closetSaved, removeFromClosetSaved } from "../../data/closetSaved.js";

let outfitSummaryHTML = ``;

export function renderOutfitSummary() {
  // Ordenar closetSaved por groupId
  const sortedCloset = closetSaved.slice().sort((a, b) => a.groupId.localeCompare(b.groupId));

  // Agrupar por groupId
  sortedCloset.forEach((closetItem) => {
    outfitSummaryHTML += `
      <div class="outfit-group-container js-outfit-group-container-${closetItem.groupId}">
        <h3>Nombre: ${closetItem.groupName}</h3>
        <span class="delete-quantity-link link-primary js-delete-link
          js-delete-link-${closetItem.groupId}"
          data-group-id="${closetItem.groupId}">
          Borrar
        </span>
        <div class="outfit-group">
    `;

    // Recorrer prendaId para obtener cada prenda dentro del grupo
    closetItem.prendaId.forEach((id) => {
      const matchingPrenda = getPrenda(id);

      outfitSummaryHTML += `
        <div class="closetSaved-item-container
          js-closetSaved-item-container 
          js-closetSaved-item-container-${matchingPrenda.id}">
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
        </div> <!-- Cierre de outfit-group -->
      </div> <!-- Cierre de outfit-group-container -->  
    `;
  });

  document.querySelector('.js-outfit-closet')
    .innerHTML = outfitSummaryHTML;

  // Agregar funcionalidad de eliminación
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const groupId = link.dataset.groupId;
        removeFromClosetSaved(groupId);

        const container = document.querySelector(
          `.js-outfit-group-container-${groupId}`
        );
        container.remove();
      });
    });
}

renderOutfitSummary();