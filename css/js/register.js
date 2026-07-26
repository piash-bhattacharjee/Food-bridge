/* ===========================================
   SHOW / HIDE PASSWORD
=========================================== */

const passwordFields = document.querySelectorAll(".toggle-password");

passwordFields.forEach((toggle) => {

    toggle.addEventListener("click", function () {

        const input = this.previousElementSibling;

        if (input.type === "password") {

            input.type = "text";

            this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';

        }

        else {

            input.type = "password";

            this.innerHTML = '<i class="fa-solid fa-eye"></i>';

        }

    });

});


/* ===========================================
   REGISTER FORM
=========================================== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Registration Successful! Login feature will be available in Update 3.");

        window.location.href = "login.html";

    });

}