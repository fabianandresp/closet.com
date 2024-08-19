import { getPrenda } from "./ropa.js";

export let closet = []; // Inicializa closet como un array vacío

loadFromStorage();

export function loadFromStorage() {
  const storedCloset = localStorage.getItem('closet');
  closet = storedCloset ? JSON.parse(storedCloset) : []; // Si no hay datos, inicializa closet como un array vacío
}

function saveToStorage() {
  localStorage.setItem('closet', JSON.stringify(closet));
}

export function addToCloset(prendaId) {
  let matchingItem;

  closet.forEach((closetItem) => {
    if (prendaId === closetItem.id) {
      matchingItem = closetItem;
    }
  });

  if (!matchingItem) {
    closet.push({
      id: prendaId
    });
  }

  console.log(closet);
  saveToStorage();
}

export function removeFromCloset(prendaId) {
  const newCart = [];

  closet.forEach((closetItem) => {
    console.log(closetItem.id);
    if (parseInt(closetItem.id) !== parseInt(prendaId)) {
      newCart.push(closetItem);
    }
  });

  closet = newCart;
  saveToStorage();
}


export function checkCloset(prendaId) {
  let isInCloset = false;
  let hasTipoRopa = false;

  

  closet.forEach((closetItem) => {
    const matchingPrenda = getPrenda(prendaId);
    const matchingPrenda2 = getPrenda(closetItem.id);

    if (parseInt(closetItem.id) === parseInt(prendaId)) {
      isInCloset = true;
    }
    console.log(matchingPrenda.tipoRopaId);
    console.log(matchingPrenda2.tipoRopaId);
    if (parseInt(matchingPrenda.tipoRopaId) == parseInt(matchingPrenda2.tipoRopaId)) { // Si hay una prenda con tipoRopa === 1

      hasTipoRopa = true;
    }
  });

  return {
    isInCloset: isInCloset,
    hasTipoRopa: hasTipoRopa
  };
}