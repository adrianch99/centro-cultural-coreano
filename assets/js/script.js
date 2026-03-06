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
