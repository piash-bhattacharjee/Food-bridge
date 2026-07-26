/* ===========================================
   SHOW / HIDE PASSWORD
=========================================== */

const passwordInput = document.getElementById("password");

const togglePassword = document.querySelector(".toggle-password");

if(togglePassword){

    togglePassword.addEventListener("click",function(){

        if(passwordInput.type==="password"){

            passwordInput.type="text";

            this.innerHTML='<i class="fa-solid fa-eye-slash"></i>';

        }

        else{

            passwordInput.type="password";

            this.innerHTML='<i class="fa-solid fa-eye"></i>';

        }

    });

}


/* ===========================================
   LOGIN FORM
=========================================== */

const loginForm=document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit",function(e){

        e.preventDefault();

        alert("Login feature will be available in Update 3.");

    });

}