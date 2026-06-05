const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('open');
});

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => menu.classList.remove('open'));
});


// Dropdown dos principais tratamentos no celular
const dropBtn = document.querySelector('.dropbtn');
const dropdown = document.querySelector('.dropdown');
if (dropBtn && dropdown) {
  dropBtn.addEventListener('click', () => dropdown.classList.toggle('open'));
}
