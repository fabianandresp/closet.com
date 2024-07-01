export const tipoRopa = [{
  id: 1,
  tipo: "Zapatos"
}, {
  id: 2,
  tipo: "Pantalones"
}, {
  id: 3,
  tipo: "Camisas"
}];

export function getTipoRopa (tipoRopaId) {
  let tipoRopa;

    tipo.forEach((opcion) => {
      if (opcion.id === tipoRopaId) {
        tipoRopa = opcion;
      }
    });

    return tipoRopa || tipoRopa[0];
}