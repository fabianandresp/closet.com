export let closet;

loadFromStorage();

export function loadFromStorage() {
  closet = JSON.parse(localStorage.getItem('closet'));

  if (!closet) {
    closet = [{
      productId: '1'
    }, {
      productId: '2'
    }];
  }
}

function saveToStorage() {
  localStorage.setItem('closet', JSON.stringify(closet));
}

export function addToCloset(prendaId) {
  let matchingItem;

  closet.forEach((closetItem) => {
    if (prendaId === closetItem.prendaId) {
      matchingItem = closetItem;
    }
  });

  closet.push({
    id: prendaId,
  })

  console.log(closet);
  saveToStorage();
}

export function removeFromCloset(prendaId) {
  const newCart = [];

  closet.forEach((closetItem) => {
    console.log(closetItem.id);
    //console.log(prendaId);
    if (parseInt(closetItem.id) !== parseInt(prendaId)) {
      newCart.push(closetItem);
    }
  });

  closet = newCart;

  saveToStorage();
}



