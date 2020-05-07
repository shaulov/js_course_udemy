function form() {
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
}

module.exports = form;