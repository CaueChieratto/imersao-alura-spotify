const iconPassword = document.querySelectorAll(".iconPassword");
const inputPassword = document.getElementById("password");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btnLogin = document.getElementById("login");

const back = document.getElementById("back");

back.addEventListener("click", () => {
  window.location.href = "index.html";
});

iconPassword.forEach((icon) => {
  toggleVisibilityOfPassword(icon);
});

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  if (login(email, password)) {
    alert("Login realizado com sucesso!");
    window.location.href = "index.html";
  } else {
    alert("E-mail ou senha incorretos!");
  }
});

function toggleVisibilityOfPassword(icon) {
  icon.addEventListener("click", () => {
    const eyeClose = document.querySelector(".close");
    const eyeOpen = document.querySelector(".open");

    if (inputPassword.type == "password") {
      inputPassword.type = "text";
      eyeClose.classList.replace("show", "hidden");
      eyeOpen.classList.replace("hidden", "show");
    } else {
      inputPassword.type = "password";
      eyeOpen.classList.replace("show", "hidden");
      eyeClose.classList.replace("hidden", "show");
    }
  });
}

function login(email, password) {
  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  const found = accounts.find(
    (account) => account.email === email && account.password === password
  );

  if (found) {
    localStorage.setItem("loggedAccount", JSON.stringify(found));
    return true;
  } else {
    return false;
  }
}
