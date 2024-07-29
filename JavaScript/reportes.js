document.addEventListener('DOMContentLoaded', () => {
    const reportesDiv = document.getElementById('reportes-list');
    let reportes = JSON.parse(localStorage.getItem('reportes')) || [];

    reportes.forEach(reporte => {
        const nuevoReporte = document.createElement('tr');
        nuevoReporte.innerHTML = `
            <td>${reporte.id}</td>
            <td>${reporte.tipo}</td>
            <td>${reporte.mensaje}</td>
            <td>${reporte.fecha}</td>
        `;
        reportesDiv.appendChild(nuevoReporte);
    });
});


let isVisibleInicio = false;
document.querySelector("[boton-inicio]").addEventListener("click", e => {
  if (!isVisibleInicio) {
    document.querySelector("[boton-inicio]").classList.add("menu-botones-medio-onclick");
    agregarReporte('Cambio de pestaña a inicio','Cambio de pestaña');
    location.href = "/home.html";
  } else {
    document.querySelector("[boton-inicio]").classList.add("menu-botones-medio");
    agregarReporte('Cambio de pestaña a inicio','Cambio de pestaña');
    location.href = "/home.html";
  }
})


let isVisibleBuscar = false;
document.querySelector("[boton-buscar]").addEventListener("click", e => {
  if (!isVisibleBuscar) {
    document.querySelector("[boton-buscar]").classList.add("menu-botones-medio-onclick");
    agregarReporte('Cambio de pestaña a buscar','Cambio de pestaña');
    location.href = "/homeBuscar.html";
  } else {
    document.querySelector("[boton-buscar]").classList.add("menu-botones-medio");
    agregarReporte('Cambio de pestaña a buscar','Cambio de pestaña');
    location.href = "/homeBuscar.html";
  }
})
