document.addEventListener("DOMContentLoaded", () => {

    fetch("cta.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("site-cta").innerHTML = html;
        });

});