document.addEventListener("DOMContentLoaded", () => {

    fetch("head.html")
        .then(response => response.text())
        .then(html => {

            document.getElementById("site-header").innerHTML = html;

            const menuBtn = document.getElementById("menuBtn");
            const menu = document.getElementById("menu");

            if(menuBtn && menu){
                menuBtn.addEventListener("click", () => {
                    menu.classList.toggle("active");
                });
            }

        })
        .catch(error => {
            console.error("Erro ao carregar cabeçalho:", error);
        });

});