export let closetSaved = [];

// Apenas iniciar este module se corren los outfit guardados anteriormente en el carrito
(function loadFromStorage() {
  const savedData = localStorage.getItem('closetSaved');
  if (savedData) {
    closetSaved = JSON.parse(savedData);
  }
})();

function saveToStorage() {
  localStorage.setItem('closetSaved', JSON.stringify(closetSaved));
}

function generateUniqueId() {
  return Date.now().toString(); // Genera id por la hora que se genero
}

export function addToClosetSaved(prendaId, outfitName) {
  const groupId = generateUniqueId();
  console.log(closetSaved);
  const group = {
    groupId: groupId,
    groupName: outfitName,
    prendaId: prendaId
  };

  closetSaved.push(group);
  saveToStorage();
  console.log(closetSaved);
}

export function removeFromClosetSaved(prendaId) {
  const newCart = [];
  console.log(parseInt(prendaId));
  closetSaved.forEach((closetItem) => {
    
    //console.log(prendaId);
    if (parseInt(closetItem.groupId) !== parseInt(prendaId)) {
      console.log(parseInt(closetItem.groupId));
      newCart.push(closetItem);
    }
  });

  closetSaved = newCart;

  saveToStorage();
}
