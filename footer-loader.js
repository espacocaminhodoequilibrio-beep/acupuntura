document.addEventListener("DOMContentLoaded", () => {


fetch("footer.html")
    .then(response => response.text())
    .then(html => {

        document.getElementById("site-footer").innerHTML = html;

        const year = document.getElementById("year");

        if(year){
            year.textContent = new Date().getFullYear();
        }

    });


});
