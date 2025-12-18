// ================= FIREBASE IMPORTS =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyBoQ4uheO3uR_jvLLiB3jkx5EAJIvVGG7U",
  authDomain: "destination-booking-app.firebaseapp.com",
  databaseURL: "https://destination-booking-app-default-rtdb.firebaseio.com",
  projectId: "destination-booking-app",
  storageBucket: "destination-booking-app.appspot.com",
  messagingSenderId: "530544580168",
  appId: "1:530544580168:web:b2d6833a3d164bc0abea7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ================= DOM =================
const pages = {
  login: document.getElementById("page-login"),
  signup: document.getElementById("page-signup"),
  trips: document.getElementById("page-trips")
};

const loginBtn = document.getElementById("loginBtn");
const goSignup = document.getElementById("goSignup");
const signupBtn = document.getElementById("signupBtn");
const goLogin = document.getElementById("goLogin");
const logoutBtn = document.getElementById("logoutBtn");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("destinationList");

let currentUserId = null; // we’ll use email as key

// ================= SWITCH PAGES =================
function showPage(page) {
  Object.values(pages).forEach(p => p.style.display = "none");
  pages[page].style.display = "block";
}

goSignup.onclick = () => showPage("signup");
goLogin.onclick = () => showPage("login");

// ================= LOGIN/SIGNUP UI (No Auth) =================
loginBtn.onclick = () => {
  const email = document.getElementById("loginEmail").value.trim();
  if (!email) { alert("Enter email"); return; }
  currentUserId = email.replace('.', '-');
  showPage("trips");
  loadTrips();
};

signupBtn.onclick = () => {
  const email = document.getElementById("signupEmail").value.trim();
  if (!email) { alert("Enter email"); return; }
  currentUserId = email.replace('.', '-');
  showPage("trips");
  loadTrips();
};

logoutBtn.onclick = () => {
  currentUserId = null;
  showPage("login");
};

// ================= ADD TRIP =================
addBtn.onclick = () => {
  if (!currentUserId) return alert("Login first!");
  const name = document.getElementById("name").value.trim();
  const country = document.getElementById("country").value.trim();
  const cost = document.getElementById("cost").value.trim();
  if (!name || !country || !cost) return alert("All fields required");

  const tripRef = push(ref(db, `users/${currentUserId}/trips`));
  set(tripRef, { name, country, cost, createdAt: Date.now() });
  clearInputs();
};

// ================= LOAD TRIPS =================
function loadTrips() {
  if (!currentUserId) return;
  const tripsRef = ref(db, `users/${currentUserId}/trips`);
  onValue(tripsRef, snapshot => {
    list.innerHTML = "";
    if (!snapshot.exists()) { list.innerHTML = "<p>No trips yet ✈️</p>"; return; }

    const data = snapshot.val();
    Object.keys(data).forEach(id => {
      const d = data[id];
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${d.name}</h3>
        <p>${d.country}</p>
        <p>$${d.cost}</p>
        <button onclick="deleteTrip('${id}')">Delete</button>
      `;
      list.appendChild(card);
    });
  });
}

// ================= DELETE TRIP =================
window.deleteTrip = id => {
  if (!currentUserId) return;
  remove(ref(db, `users/${currentUserId}/trips/${id}`));
};

// ================= CLEAR INPUTS =================
function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("country").value = "";
  document.getElementById("cost").value = "";
}
