window.addEventListener("DOMContentLoaded", function () {
    "use strict";

    //TABS

    let tab = document.querySelectorAll(".info-header-tab"),
        info = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains("hide")) {
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        }
    }

    info.addEventListener("click", function (event) {
        // arrow func
        let target = event.target;
        if (target && target.classList.contains("info-header-tab")) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    activateTabDescription(i);
                    break;
                }
            }
        }
    });

    //TIMER

    let deadline = "2020-05-01";

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t / (1000 * 60 * 60));

        return {
            total: t,
            seconds: seconds,
            minutes: minutes,
            hours: hours,
        };
    }

    function setClock(id, endtime) {
        let timer = document.querySelector(id),
            hours = document.querySelector(".hours"),
            minutes = document.querySelector(".minutes"),
            seconds = document.querySelector(".seconds"),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours < 10 ? "0" + t.hours : t.hours;
            minutes.textContent = t.minutes < 10 ? "0" + t.minutes : t.minutes;
            seconds.textContent = t.seconds < 10 ? "0" + t.seconds : t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
            }
        }
    }

    setClock("timer", deadline);

    // MODAL WINDOW

    let more = document.querySelector(".more"),
        overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close"),
        descriptionBtn = document.querySelectorAll(".description-btn");

    more.addEventListener("click", function () {
        overlay.style.display = "block";
        this.classList.add("more-splash");
        document.body.style.overflow = "hidden";
    });

    close.addEventListener("click", function () {
        overlay.style.display = "none";
        more.classList.remove("more-splash");
        document.body.style.overflow = "";
    });

    function activateTabDescription(c) {
        descriptionBtn[c].addEventListener("click", function () {
            overlay.style.display = "block";
            this.classList.add("more-splash");
            document.body.style.overflow = "hidden";
        });
    }

    activateTabDescription(0);

    // FORM

    let mainForm = document.querySelector(".main-form"),
        contactForm = document.getElementById("form"),
        statusMessage = document.createElement("div");

    function handleForm(form) {
        let message = {
            loading: "Загрузка..",
            success: "Спасибо! Мы скоро свяжемся с Вами",
            failure: "Что-то пошло не так",
        };

        let input = form.getElementsByTagName("input");

        statusMessage.classList.add("status");

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            form.insertAdjacentElement("beforeend", statusMessage);

            function postData(data) {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open("POST", "server.php");
                    request.setRequestHeader(
                        "Content-Type",
                        "aplication/json; charset=utf-8"
                    );

                    let formData = new FormData(data);

                    let obj = {};
                    formData.forEach(function (value, key) {
                        obj[key] = value;
                    });

                    let json = JSON.stringify(obj);

                    request.send(json);

                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    };
                });
            }

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = "";
                }
            }

            postData(form)
                .then(() => (statusMessage.innerHTML = message.success))
                .catch(() => (statusMessage.innerHTML = message.failure))
                .finally(clearInput);
        });
    }

    handleForm(mainForm);
    handleForm(contactForm);

    //SLIDER
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
});