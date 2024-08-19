const loggedInUser = localStorage.getItem('loggedInUserName');

document.addEventListener('DOMContentLoaded', () => {
  const perfilActivo = localStorage.getItem('perfilActivo');
  const reportesDiv = document.getElementById('reportes-list');
  let reportes = JSON.parse(localStorage.getItem('reportes')) || [];

  reportes = reportes.filter(reporte => reporte.perfil === perfilActivo);

  const perfilNames = {};
  const profilesData = JSON.parse(localStorage.getItem('profilesData'));
  profilesData.forEach(profile => {
    perfilNames[profile.sessionId] = profile.name;
  });

  reportes.forEach(reporte => {
    const perfilName = perfilNames[reporte.perfil];
    const nuevoReporte = document.createElement('tr');
    const usuarioActivo = `${loggedInUser} - ${perfilName}`;
    nuevoReporte.innerHTML = `
      <td>${reporte.id}</td>
      <td>${usuarioActivo}</td>
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
    location.href = "./home.html";
  } else {
    document.querySelector("[boton-inicio]").classList.add("menu-botones-medio");
    location.href = "./home.html";
  }
});

function agregarReporte(mensaje, tipo) {
  const perfilActivo = localStorage.getItem('perfilActivo');
  let reportes = JSON.parse(localStorage.getItem('reportes')) || [];

  const nuevoReporte = {
      id: reportes.length + 1,
      tipo: tipo,
      mensaje: mensaje,
      fecha: new Date().toLocaleString(),
      perfil: perfilActivo
  };

  reportes.push(nuevoReporte);
  localStorage.setItem('reportes', JSON.stringify(reportes));
}