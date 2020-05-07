function modal() {
    let more = document.querySelector(".more"),
        overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close"),
        descriptionBtn = document.querySelectorAll(".description-btn");

    function activateTabDescription(button) {
        button.addEventListener("click", function () {
            overlay.style.display = "block";
            this.classList.add("more-splash");
            document.body.style.overflow = "hidden";
        });
    }

    more.addEventListener('click', activateTabDescription(more));

    descriptionBtn.forEach((item) => {
        item.addEventListener('click', activateTabDescription(item));
    });

    close.addEventListener("click", () => {
        overlay.style.display = "none";
        more.classList.remove("more-splash");
        document.body.style.overflow = "";
    });
}

module.exports = modal;