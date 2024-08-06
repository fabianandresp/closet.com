export let closetSaved = [];

// Apenas iniciar este module se corren los outfit guardados anteriormente
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

export function addToClosetSaved(prendaId) {
  const groupId = generateUniqueId();
  console.log(closetSaved);
  const group = {
    groupId: groupId,
    prendaId: prendaId,
  };

  closetSaved.push(group);
  saveToStorage();
  console.log(closetSaved);
}

export function removeFromClosetSaved(prendaId) {
  const newCart = [];

  closetSaved.forEach((closetItem) => {
    console.log(closetItem.id);
    //console.log(prendaId);
    if (parseInt(closetItem.id) !== parseInt(prendaId)) {
      newCart.push(closetItem);
    }
  });

  closetSaved = newCart;

  saveToStorage();
}
