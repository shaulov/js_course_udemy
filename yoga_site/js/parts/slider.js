function slider() {
    let slideIndex = 0,
        slides = document.querySelectorAll(".slider-item"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        dotsWrap = document.querySelector(".slider-dots"),
        dots = document.querySelectorAll(".dot");

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length - 1) {
            slideIndex = 0;
        }

        if (n < 0) {
            slideIndex = slides.length - 1;
        }

        slides.forEach((item) => (item.style.display = "none"));
        dots.forEach((item) => item.classList.remove("dot-active"));

        slides[slideIndex].style.display = "block";
        dots[slideIndex].classList.add("dot-active");
    }

    function plusSlides(n) {
        showSlides((slideIndex += n));
    }

    function currentSlide(n) {
        showSlides((slideIndex = n));
    }

    prev.addEventListener("click", function () {
        plusSlides(-1);
    });

    next.addEventListener("click", function () {
        plusSlides(1);
    });

    dotsWrap.addEventListener("click", function (event) {
        for (let i = 0; i < dots.length; i++) {
            if (event.target.classList.contains("dot") && event.target == dots[i]) {
                currentSlide(i);
            }
        }
    });
}

module.exports = slider;