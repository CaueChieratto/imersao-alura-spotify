const h1 = document.querySelector("h1");
const progressBar = document.querySelector(".progressBar");
const stepsToRegister = document.querySelector(".stepsToRegister");
const nameInput = document.querySelector(".nameInput");
const containerForm = document.querySelector(".containerForm");
const progressBarCompleted = document.querySelector(".progressBarCompleted");
const form = document.querySelector("form");

const backIcon = document.getElementById("backIcon");
const emailInput = document.getElementById("email");
const buttonSaveEmail = document.getElementById("saveEmail");
const loginQuestion = document.getElementById("loginQuestion");

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPassword = /^(?=.*[a-zA-Z])(?=.*[\d\W]).{10,}$/;
const regexName = /^[a-zA-Z\s]{3,}$/;
const regexDay = /^(0?[1-9]|[12][0-9]|3[01])$/;
const regexMonth = /^(1[0-2]|[1-9])$/;
const regexYear = /^\d{4}$/;

let account = JSON.parse(localStorage.getItem("accounts")) || [];
let currentAccount = {};

function updateAccounts() {
  localStorage.setItem("accounts", JSON.stringify(account));
}

emailInput.addEventListener("blur", () => {
  const checkEmail = regexEmail.test(emailInput.value);
  const invalidEmail = document.querySelector(".invalidEmail");

  if (!checkEmail) {
    invalidEmail.classList.remove("hidden");
    emailInput.classList.add("inputInvalidEmail");
    return;
  }
  invalidEmail.classList.add("hidden");
  emailInput.classList.remove("inputInvalidEmail");
});

buttonSaveEmail.addEventListener("click", (e) => {
  e.preventDefault();

  const checkEmail = regexEmail.test(emailInput.value);

  if (checkEmail) {
    currentAccount.email = emailInput.value;

    containerForm.classList.add("hidden");
    loginQuestion.classList.add("hidden");
    h1.classList.add("hidden");

    progressBar.classList.remove("hidden");
    stepsToRegister.classList.remove("hidden");
    createInputPassword();
    return;
  }

  const invalidEmail = document.querySelector(".invalidEmail");
  invalidEmail.classList.remove("hidden");

  emailInput.classList.add("inputInvalidEmail");
});

function createForm() {
  let containerFormYou = document.querySelector(".containerFormYou");

  if (containerFormYou) {
    containerFormYou.classList.remove("hidden");
  } else {
    const containerFormYou = document.createElement("div");
    containerFormYou.classList.add("containerFormYou");
    containerFormYou.innerHTML = `
          <div class="inputName">
            <p>Nome</p>
            <p>Este nome aparecerá no seu perfil</p>
            <input type="text" id="name" />
            <div class="invalidName hidden">
              <span class="fas fa-exclamation-circle"></span>
              <span>Insira um nome para seu perfil.</span>
            </div>
          </div>
          <div class="containerDate">
            <div class="containerDateForm">
              <p class="textTitle">Data de nascimento</p>
              <p class="textSubTitle">
                Por que precisamos da sua data de nascimento?<a
                  target="_blank"
                  href="https://www.spotify.com/br-pt/legal/end-user-agreement/"
                  >Saiba mais</a
                >.
              </p>
              <div>
                <div class="containerInputsAndSelectDate">
                  <input type="text" id="day" placeholder="dd" />
                  <div class="month">
                    <img src="src/assets/icons/arrowDown.png" />
                    <select id="month">
                      <option value="">Mês</option>
                      <option value="1">Janeiro</option>
                      <option value="2">Fevereiro</option>
                      <option value="3">Março</option>
                      <option value="4">Abril</option>
                      <option value="5">Maio</option>
                      <option value="6">Junho</option>
                      <option value="7">Julho</option>
                      <option value="8">Agosto</option>
                      <option value="9">Setembro</option>
                      <option value="10">Outubro</option>
                      <option value="11">Novembro</option>
                      <option value="12">Dezembro</option>
                    </select>
                  </div>
                  <input type="text" id="year" placeholder="aaaa" />
                </div>
                <div class="invalidName hidden dateForm">
                  <div class="iconAndMessage hidden">
                    <span class="fas fa-exclamation-circle"></span>
                    <span
                      >Insira o dia que você nasceu usando um número entre 1 e
                      31.</span
                    >
                  </div>
                  <div class="iconAndMessage hidden">
                    <span class="fas fa-exclamation-circle"></span>
                    <span>Selecione o mês de nascimento.</span>
                  </div>
                  <div class="iconAndMessage hidden">
                    <span class="fas fa-exclamation-circle"></span>
                    <span
                      >Insira o ano que você nasceu usando quatro dígitos (por
                      exemplo, 1990).</span
                    >
                  </div>
                </div>
              </div>
              <div class="containerCheckboxs">
                <p>Gênero</p>
                <p>
                  Usamos seu gênero para ajudar a personalizar nossas
                  recomendações de conteúdo e anúncios pra você.
                </p>
                <div class="check">
                  <label class="containerCheckboxIcon">
                    <input type="checkbox" id="men" />
                    <span class="custom-ball"></span>
                    <span>Homem</span>
                  </label>
                  <label class="containerCheckboxIcon">
                    <input type="checkbox" id="women" />
                    <span class="custom-ball"></span>
                    <span>Mulher</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button id="saveInfo">Avançar</button>
    `;

    form.appendChild(containerFormYou);

    const inputName = document.getElementById("name");
    inputName.addEventListener("blur", () => {
      sendMessageError();
    });

    errorInDates();
  }
  savePersonalInfo();
  setupGenderCheckbox();
}

function errorInDates() {
  const dayInput = document.getElementById("day");
  const monthSelect = document.getElementById("month");
  const monthContainer = document.querySelector(".month");
  const yearInput = document.getElementById("year");

  const dateForm = document.querySelector(".dateForm");
  const messageInvalid = dateForm.children;

  function validateField(field) {
    for (let msg of messageInvalid) {
      msg.classList.add("hidden");
    }

    dayInput.classList.remove("inputInvalid");
    monthContainer.classList.remove("inputInvalid");
    yearInput.classList.remove("inputInvalid");

    let invalid = false;

    if (regexDay.test(dayInput.value.trim())) {
      dayInput.classList.remove("inputInvalid");
      messageInvalid[0].classList.add("hidden");
    } else {
      dayInput.classList.add("inputInvalid");
      messageInvalid[0].classList.remove("hidden");
      invalid = true;
    }

    if (regexMonth.test(monthSelect.value.trim())) {
      monthContainer.classList.remove("inputInvalid");
      messageInvalid[1].classList.add("hidden");
    } else {
      monthContainer.classList.add("inputInvalid");
      messageInvalid[1].classList.remove("hidden");
      invalid = true;
    }

    if (regexYear.test(yearInput.value.trim())) {
      yearInput.classList.remove("inputInvalid");
      messageInvalid[2].classList.add("hidden");
    } else {
      yearInput.classList.add("inputInvalid");
      messageInvalid[2].classList.remove("hidden");
      invalid = true;
    }

    dateForm.classList.toggle("hidden", !invalid);
  }

  dayInput.addEventListener("input", () => validateField(dayInput));
  monthSelect.addEventListener("input", () => validateField(monthSelect));
  yearInput.addEventListener("input", () => validateField(yearInput));
}

function sendMessageError() {
  const inputName = document.getElementById("name");

  const invalidName = document.querySelector(".invalidName");
  const checkName = regexName.test(inputName.value);

  if (!checkName) {
    invalidName.classList.add("hidden");
    inputName.classList.remove("inputInvalid");
    return;
  }

  invalidName.classList.remove("hidden");
  inputName.classList.add("inputInvalid");
}

function setupGenderCheckbox() {
  const menCheckbox = document.getElementById("men");
  const womenCheckbox = document.getElementById("women");

  menCheckbox.addEventListener("change", () => {
    if (menCheckbox.checked) {
      womenCheckbox.checked = false;
      currentAccount.gender = "Homem";
    } else {
      if (currentAccount.gender === "Homem") {
        delete currentAccount.gender;
      }
    }
  });

  womenCheckbox.addEventListener("change", () => {
    if (womenCheckbox.checked) {
      menCheckbox.checked = false;
      currentAccount.gender = "Mulher";
    } else {
      if (currentAccount.gender === "Mulher") {
        delete currentAccount.gender;
      }
    }
  });
}

function savePersonalInfo() {
  const containerFormYou = document.querySelector(".containerFormYou");
  const btnSaveInfo = document.getElementById("saveInfo");
  const name = document.getElementById("name");

  btnSaveInfo.addEventListener("click", (e) => {
    e.preventDefault();

    const day = document.getElementById("day");
    const month = document.getElementById("month");
    const year = document.getElementById("year");
    const birthday = `${day.value}/${month.value}/${year.value}`;

    currentAccount.name = name.value;
    currentAccount.birthday = birthday;

    containerFormYou.classList.add("hidden");

    createFinalLoginRequest();

    const steps = document.getElementById("steps");
    const stepsText = document.getElementById("stepsText");

    steps.textContent = "Etapa 3 de 3";
    stepsText.textContent = "Termos e Condições";

    progressBarCompleted.style.inlineSize = "100%";
  });
}

function createFinalLoginRequest() {
  let containerFinalRequest = document.querySelector(".containerFinalRequest");

  if (containerFinalRequest) {
    containerFinalRequest.classList.remove("hidden");
  } else {
    const containerFinalRequest = document.createElement("div");
    containerFinalRequest.classList.add("containerFinalRequest");
    containerFinalRequest.innerHTML = `
        <div class="containerFinalRequest">
          <div class="containerFinalRequestBoxes">
            <label class="finalRequestBoxes">
              <input type="checkbox" id="marketingMsg"/>
              <span class="customCheck"></span>
              <p>Não quero receber mensagens de marketing do Spotify</p>
            </label>

            <label class="finalRequestBoxes">
              <input type="checkbox" id="shareData"/>
              <span class="customCheck"></span>
              <p>
                Compartilhar meus dados cadastrais com os provedores de conteúdo
                do Spotify para fins de marketing.
              </p>
            </label>

            <label class="finalRequestBoxes">
              <input type="checkbox" id="terms" />
              <span class="customCheck"></span>
              <p>
                Eu concordo com os
                <a
                  target="_blank"
                  href="https://www.spotify.com/br-pt/legal/end-user-agreement/"
                  >Termos e Condições de Uso do Spotify</a
                >.
              </p>
            </label>
          </div>

          <p class="p">
            Para saber mais sobre como o Spotify coleta, utiliza, compartilha e
            protege seus dados pessoais, leia a <br />
            <a
              target="_blank"
              href="https://www.spotify.com/br-pt/legal/privacy-policy/"
              >Política de Privacidade do Spotify</a
            >.
          </p>
          <button id="createAccount">Inscrever-se</button>
        </div>
    `;
    form.appendChild(containerFinalRequest);
  }

  saveTermsAndConditions();
  subscribe();
}

function saveTermsAndConditions() {
  const marketingMsg = document.getElementById("marketingMsg");
  const shareData = document.getElementById("shareData");
  const terms = document.getElementById("terms");

  marketingMsg.addEventListener("change", () => {
    currentAccount.marketingMsg = marketingMsg.checked;
  });

  shareData.addEventListener("change", () => {
    currentAccount.shareData = shareData.checked;
  });

  terms.addEventListener("change", () => {
    currentAccount.terms = terms.checked;
  });
}

function changeVisibilityPassword() {
  const inputPasswordContainer = document.querySelector(
    ".inputPasswordContainer"
  );

  inputPasswordContainer.addEventListener("click", (event) => {
    const openEye = document.querySelector(".open");
    const closeEye = document.querySelector(".close");
    const passwordInput = document.querySelector("#password");

    if (event.target.classList.contains("iconPassword")) {
      openEye.classList.toggle("hidden");
      openEye.classList.toggle("show");
      closeEye.classList.toggle("hidden");
      closeEye.classList.toggle("show");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    }
  });
}

function createInputPassword() {
  let containerFormPassword = document.querySelector(".containerFormPassword");

  if (containerFormPassword) {
    containerFormPassword.classList.remove("hidden");
  } else {
    const containerFormPassword = document.createElement("div");
    containerFormPassword.classList.add("containerFormPassword");
    containerFormPassword.innerHTML = `
              <div class="inputPassword">
                <p class="nameInputPassword">Senha</p>
                <div class="inputPasswordContainer">
                  <input type="password" id="password" />
                  <i class="fas fa-eye iconPassword open hidden"></i>
                  <i class="fas fa-eye-slash iconPassword close show"></i>
                </div>
              </div>
              <div class="containerPasswordRequirements">
                A senha deve ter pelo menos
               <ul>
                  <li>
                    <i class="fas fa-circle iconLi"></i>
                    <div class="textLi">
                      1 letra
                    </div>
                  </li>
                  <li>
                    <i class="fas fa-circle iconLi"></i>
                    <div class="textLi">
                      1 número ou caractere especial (exemplo: # ? ! &)
                    </div>
                  </li>
                  <li>
                    <i class="fas fa-circle iconLi"></i>
                    <div class="textLi">
                      10 caracteres
                    </div>
                  </li>
                </ul>
              </div>
              <button id="savePassword">Avançar</button>
    `;
    form.appendChild(containerFormPassword);
  }
  const passwordInput = document.getElementById("password");
  passwordInput.addEventListener("blur", () => {
    checkPassword();
  });

  changeVisibilityPassword();
  savePassword();
}

function savePassword() {
  const buttonSavePassword = document.querySelector("#savePassword");
  const progressBarCompleted = document.querySelector(".progressBarCompleted");
  const containerFormPassword = document.querySelector(
    ".containerFormPassword"
  );

  buttonSavePassword.addEventListener("click", (e) => {
    e.preventDefault();

    if (!checkPassword()) {
      return;
    }

    containerFormPassword.classList.add("hidden");

    createForm();

    const steps = document.getElementById("steps");
    const stepsText = document.getElementById("stepsText");

    steps.textContent = "Etapa 2 de 3";
    stepsText.textContent = "Fale de você";

    progressBarCompleted.style.inlineSize = "66.6667%";
  });
}

function checkPassword() {
  const password = document.getElementById("password");
  const list = document.querySelectorAll("li");
  const isValid = regexPassword.test(password.value);

  if (!isValid) {
    password.classList.add("passwordInvalid");
    list.forEach((li) => {
      li.classList.add("invalidPassword");
    });
  } else {
    currentAccount.password = password.value;
    password.classList.remove("passwordInvalid");
    list.forEach((li) => {
      li.classList.remove("invalidPassword");
    });
  }

  return isValid;
}

function back(classe1, classe2, classe3, classe4) {
  const containerForm = document.querySelector(classe1);
  const containerFormPassword = document.querySelector(classe2);
  const containerFormYou = document.querySelector(classe3);
  const containerFormFinal = document.querySelector(classe4);

  const steps = document.getElementById("steps");
  const stepsText = document.getElementById("stepsText");

  if (containerFormFinal && !containerFormFinal.classList.contains("hidden")) {
    containerFormFinal.classList.add("hidden");
    containerFormYou.classList.remove("hidden");

    progressBarCompleted.style.inlineSize = "66.6667%";

    steps.textContent = "Etapa 2 de 3";
    stepsText.textContent = "Fale de você";
    return;
  }

  if (containerFormYou && !containerFormYou.classList.contains("hidden")) {
    containerFormYou.classList.add("hidden");
    containerFormPassword.classList.remove("hidden");

    progressBarCompleted.style.inlineSize = "33.3333%";

    steps.textContent = "Etapa 1 de 3";
    stepsText.textContent = "Crie uma senha";
    return;
  }

  if (
    containerFormPassword &&
    !containerFormPassword.classList.contains("hidden")
  ) {
    containerFormPassword.classList.add("hidden");
    progressBar.classList.add("hidden");
    containerForm.classList.remove("hidden");
    loginQuestion.classList.remove("hidden");
    h1.classList.remove("hidden");
    return;
  }
}

function subscribe() {
  const createAccount = document.getElementById("createAccount");
  createAccount.addEventListener("click", (e) => {
    e.preventDefault();
    account.push(currentAccount);
    updateAccounts();

    localStorage.setItem("loggedAccount", JSON.stringify(currentAccount));

    alert("Conta criada com sucesso!");
    window.location.href = "/index.html";
  });
}
