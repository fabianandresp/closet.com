export function getPrenda(prendaId) {
  let matchingPrenda;

  prendas.forEach((prenda) => {
    if (prenda.id === prendaId) {
      matchingPrenda = prenda;
    }
  });

  return matchingPrenda;
}


export const prendas = [
  {
    id: "1",
    image: "images/prendas/camisa1.png",
    nombre: "Camisa Prueba",
    estado: "limpio",
    temporada: "verano",
    tipoRopaId: 3,
    usuarioId: 1
}, {
  id: "2",
  image: "images/prendas/camisa2.webp",
  nombre: "Camisa Prueba",
  estado: "limpio",
  temporada: "verano",
  tipoRopaId: 3,
  usuarioId: 1
}, {
  id: "2",
  image: "images/prendas/camisa1.png",
  nombre: "Camisa Prueba",
  estado: "limpio",
  temporada: "verano",
  tipoRopaId: 3,
  usuarioId: 1
}, {
  id: "2",
  image: "images/prendas/camisa1.png",
  nombre: "Camisa Prueba",
  estado: "limpio",
  temporada: "verano",
  tipoRopaId: 3,
  usuarioId: 1
}, {
  id: "2",
  image: "images/prendas/camisa1.png",
  nombre: "Camisa Prueba",
  estado: "limpio",
  temporada: "verano",
  tipoRopaId: 3,
  usuarioId: 1
}, {
  id: "2",
  image: "images/prendas/pantalon1.jpg",
  nombre: "Camisa Prueba",
  estado: "limpio",
  temporada: "verano",
  tipoRopaId: 2,
  usuarioId: 1
}, {
  id: "2",
  image: "images/prendas/zapato1.webp",
  nombre: "Camisa Prueba",
  estado: "limpio",
  temporada: "verano",
  tipoRopaId: 1,
  usuarioId: 1
}];