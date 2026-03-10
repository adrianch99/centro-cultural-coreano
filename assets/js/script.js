//menú hamburguesa móvil
document.getElementById("menu-toggle").addEventListener("click", function () {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("hidden");

  // Cambiar ícono del botón
  const icon = this.querySelector("i");
  if (mobileMenu.classList.contains("hidden")) {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  } else {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  }
});

// Función para traducir del coreano al español usando Google Translate
function agregarBotonTraduccion() {
  const boton = document.createElement('button');
  boton.innerText = 'Traducir al Español';
  boton.style.position = 'fixed';
  boton.style.bottom = '20px';
  boton.style.right = '20px';
  boton.style.padding = '10px 20px';
  boton.style.backgroundColor = '#ff0000';
  boton.style.color = '#fff';
  boton.style.border = 'none';
  boton.style.borderRadius = '5px';
  boton.style.cursor = 'pointer';

  boton.addEventListener('click', () => {
    window.open('https://translate.google.com/translate?sl=ko&tl=es&u=' + encodeURIComponent(window.location.href), '_blank');
  });

  document.body.appendChild(boton);
}

// Ejecutar la función al cargar la página
window.onload = agregarBotonTraduccion;
