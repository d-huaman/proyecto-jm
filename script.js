/* ==========================================================
   proyecto-jm · script.js
   Abre las imágenes en grande en el visor (<dialog id="visor">).
   Si algo falla o el navegador es muy antiguo, el enlace de cada
   imagen sigue funcionando y la abre en otra vista.
   ========================================================== */
(function () {
  'use strict';

  var visor = document.getElementById('visor');
  if (!visor || typeof visor.showModal !== 'function') return;

  var imagenVisor = visor.querySelector('img');
  var botonCerrar = visor.querySelector('.cerrar');

  function abrir(enlace) {
    var miniatura = enlace.querySelector('img');
    imagenVisor.src = enlace.getAttribute('href');
    imagenVisor.alt = miniatura ? miniatura.alt : '';
    visor.showModal();
    document.documentElement.style.overflow = 'hidden'; // la página de fondo no se desplaza
  }

  function cerrar() {
    visor.close();
  }

  // Clic en cualquier imagen con enlace "ampliar"
  document.addEventListener('click', function (e) {
    var enlace = e.target.closest('a.ampliar');
    if (!enlace) return;
    // Si se usa Ctrl, Cmd, Shift o Alt, se deja el comportamiento normal (abrir en pestaña nueva)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    abrir(enlace);
  });

  // Cerrar: botón ✕, clic en la imagen o clic fuera de ella (la tecla Esc ya la maneja el navegador)
  botonCerrar.addEventListener('click', cerrar);
  visor.addEventListener('click', function (e) {
    if (e.target === visor || e.target === imagenVisor) cerrar();
  });

  // Al cerrarse (por cualquier vía) se restablece la página
  visor.addEventListener('close', function () {
    document.documentElement.style.overflow = '';
    imagenVisor.removeAttribute('src');
  });
})();
