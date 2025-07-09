const searchInput = document.getElementById("searchInput");
const resultArtist = document.getElementById("result-artist");

const playlistContainer = document.querySelector(".playlistContainer");

const loggedAccount = JSON.parse(localStorage.getItem("loggedAccount"));

function requestApi(searchTerm) {
  const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => displayResults(result));
}

function displayResults(result) {
  playlistContainer.classList.add("hidden");
  const artistName = document.getElementById("artist-name");
  const artistImage = document.getElementById("artist-img");

  result.forEach((element) => {
    artistName.innerText = element.name;
    artistImage.src = element.urlImg;
  });

  resultArtist.classList.remove("hidden");
}

document.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
  } else {
    requestApi(searchTerm);
  }
});

const dadosCard = [
  { img: "./src/assets/playlist/1.jpeg", text: "Boas festas", class: "card1" },
  {
    img: "./src/assets/playlist/2.jpeg",
    text: "Feitos para você",
    class: "card2",
  },
  { img: "./src/assets/playlist/3.jpeg", text: "Lançamentos", class: "card3" },
  { img: "./src/assets/playlist/4.jpeg", text: "Creators", class: "card4" },
  { img: "./src/assets/playlist/5.jpeg", text: "Para treinar", class: "card5" },
  { img: "./src/assets/playlist/6.jpeg", text: "Podcasts", class: "card6" },
  { img: "./src/assets/playlist/7.jpeg", text: "Sertanejo", class: "card7" },
  {
    img: "./src/assets/playlist/8.jpeg",
    text: "Samba e pagode",
    class: "card8",
  },
  { img: "./src/assets/playlist/9.jpeg", text: "Funk", class: "card9" },
  { img: "./src/assets/playlist/10.jpeg", text: "MPB", class: "card10" },
  { img: "./src/assets/playlist/11.jpeg", text: "Rock", class: "card11" },
  { img: "./src/assets/playlist/12.jpeg", text: "Hip Hop", class: "card12" },
  { img: "./src/assets/playlist/13.jpeg", text: "Indie", class: "card13" },
  { img: "./src/assets/playlist/14.jpeg", text: "Relax", class: "card14" },
  {
    img: "./src/assets/playlist/15.jpeg",
    text: "Música Latina",
    class: "card15",
  },
];

const itemsPlaylist = document.querySelector(".itemsPlaylist");

itemsPlaylist.innerHTML = dadosCard
  .map(
    (item) => `
      <a href class="cards">
        <div class="cards ${item.class}">
          <img src="${item.img}" />
          <span>${item.text}</span>
        </div>
      </a>
    `
  )
  .join("");

const greeting = document.getElementById("greeting");

const now = new Date();
const hour = now.getHours();

if (hour >= 4 && hour < 12) {
  greeting.textContent = `Bom dia ${loggedAccount.name}`;
} else if (hour >= 12 && hour < 18) {
  greeting.textContent = `Boa tarde ${loggedAccount.name}`;
} else {
  greeting.textContent = `Boa noite ${loggedAccount.name}`;
}

const subscribe = document.querySelector(".subscribe");
subscribe.addEventListener("click", () => {
  window.location.href = "signup.html";
});
