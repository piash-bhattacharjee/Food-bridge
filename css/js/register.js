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

const API_BASE = (() => {
    const backendPort = 5000;
    if (window.location.protocol === "file:") return `http://localhost:${backendPort}`;
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        if (window.location.port && window.location.port !== String(backendPort)) {
            return `http://localhost:${backendPort}`;
        }
    }
    return window.location.origin;
})();
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("registerPassword").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const role = document.querySelector('input[name="role"]:checked')?.value;

        if (!name || !email || !phone || !password || !confirmPassword || !role) {
            alert("Please fill out all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, phone, password, role })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Registration failed. Please try again.");
                return;
            }

            alert("Registration successful! Please login.");
            window.location.href = "login.html";
        } catch (error) {
            console.error("Registration Error:", error);
            alert("Server error. Please try again later.");
        }

    });

}