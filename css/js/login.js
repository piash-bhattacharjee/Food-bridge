```javascript
/* ===========================================
   SHOW / HIDE PASSWORD
=========================================== */

const passwordInput = document.getElementById("password");
const togglePassword = document.querySelector(".toggle-password");

if (togglePassword) {

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            this.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            passwordInput.type = "password";

            this.innerHTML =
                '<i class="fa-solid fa-eye"></i>';
        }

    });

}


/* ===========================================
   LOGIN FORM
=========================================== */

// Live Render Backend
const API_BASE = "https://foodbridge-backend-8e91.onrender.com";

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Check empty fields
        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        try {

            const response = await fetch(
                `${API_BASE}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            // Login failed
            if (!response.ok) {

                alert(
                    data.message ||
                    "Login failed. Please try again."
                );

                return;
            }

            // Save JWT token
            if (data.token) {

                localStorage.setItem(
                    "foodbridgeToken",
                    data.token
                );
            }

            // Save user information
            if (data.user) {

                localStorage.setItem(
                    "foodbridgeUser",
                    JSON.stringify(data.user)
                );
            }

            // Login successful
            alert("Login successful!");

            // Go to homepage
            window.location.href = "index.html";

        } catch (error) {

            console.error("Login Error:", error);

            alert(
                "Server error. Please try again later."
            );
        }

    });

}
```
