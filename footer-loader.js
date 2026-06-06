document.addEventListener("DOMContentLoaded", () => {
  const footerArea = document.getElementById("site-footer");

  if (!footerArea) return;

  fetch("footer.html")
    .then(response => response.text())
    .then(html => {
      footerArea.innerHTML = html;

      const year = document.getElementById("year");
      if (year) {
        year.textContent = new Date().getFullYear();
      }
    })
    .catch(error => {
      console.error("Erro ao carregar footer:", error);
    });
});
