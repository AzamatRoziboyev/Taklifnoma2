/* Sana va vaqt index.html ichida (id="eventDate", id="eventTime") o'zgartiriladi */

/* Bazm boshlanish vaqti (O'zbekiston vaqti, UTC+5): 19-oktabr 2026, 18:00 */
const EVENT_START = new Date("2026-10-19T18:00:00+05:00");

const $ = (id) => document.getElementById(id);
const fx = $("fx");
const rnd = (a, b) => Math.random() * (b - a) + a;

/* ===== Fon animatsiyalari ===== */
function addFlowers(n = 9) {
  const icons = ["🌸", "🌷", "🌿", "🌼", "🌹"];
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.className = "flower";
    s.textContent = icons[i % icons.length];
    s.style.left = rnd(0, 95) + "vw";
    s.style.fontSize = rnd(16, 28) + "px";
    s.style.animationDuration = rnd(22, 38) + "s";
    s.style.animationDelay = -rnd(0, 30) + "s";
    fx.appendChild(s);
  }
}

function addDust(n = 24) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.className = "dust";
    s.style.left = rnd(0, 100) + "vw";
    s.style.top = rnd(0, 100) + "vh";
    s.style.animationDuration = rnd(4, 9) + "s";
    s.style.animationDelay = -rnd(0, 8) + "s";
    fx.appendChild(s);
  }
}

function spawnHeart() {
  const s = document.createElement("span");
  s.className = "heart";
  s.textContent = "♡";
  s.style.left = rnd(5, 92) + "vw";
  s.style.top = rnd(35, 90) + "vh";
  s.style.fontSize = rnd(18, 32) + "px";
  fx.appendChild(s);
  setTimeout(() => s.remove(), 3300);
}

function burst(n = 36) {
  const icons = ["✦", "♡", "🌸", "✦"];
  const cx = innerWidth / 2, cy = innerHeight / 2;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.className = "burst";
    s.textContent = icons[i % icons.length];
    s.style.left = cx + "px";
    s.style.top = cy + "px";
    s.style.color = i % 2 ? "#c4993f" : "#eeb4c1";
    s.style.fontSize = rnd(12, 24) + "px";
    const a = rnd(0, Math.PI * 2), d = rnd(120, Math.min(innerWidth, 520) * 0.8);
    s.style.setProperty("--x", Math.cos(a) * d + "px");
    s.style.setProperty("--y", Math.sin(a) * d + "px");
    fx.appendChild(s);
    setTimeout(() => s.remove(), 1700);
  }
}

/* ===== Musiqa ===== */
const audio = $("bgm");
const musicBtn = $("musicBtn");
let muted = false;

function updateMusicIcon() {
  musicBtn.textContent = muted || audio.paused ? "🔇" : "🔊";
}

async function playMusic() {
  try {
    audio.volume = 0.6;
    await audio.play();
  } catch (e) {
    console.warn("Musiqa ijro etilmadi (music.mp3 mavjudligini tekshiring):", e);
  }
  updateMusicIcon();
}

musicBtn.addEventListener("click", () => {
  if (audio.paused) { muted = false; playMusic(); }
  else { audio.pause(); muted = true; updateMusicIcon(); }
  updateMusicIcon();
});

/* ===== Scroll fade-in ===== */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.2 });
  items.forEach((el, i) => {
    el.style.transitionDelay = i < 3 ? i * 0.25 + "s" : "0s";
    io.observe(el);
  });
}

/* ===== Konvertni ochish ===== */
function openInvitation() {
  const btn = $("openBtn");
  btn.classList.add("hide");
  btn.disabled = true;

  playMusic();                       // faqat tugma bosilgandan keyin
  $("envelope").classList.add("open");
  burst();

  setTimeout(() => {
    const card = $("card");
    card.hidden = false;
    card.classList.add("show");
    $("intro").classList.add("gone");
    document.body.classList.remove("locked");
    musicBtn.hidden = false;
    updateMusicIcon();
    window.scrollTo(0, 0);
    initReveal();
    setInterval(spawnHeart, 2600);
    setTimeout(() => $("intro").remove(), 1200);
  }, 2200);
}

/* ===== Teskari sanoq ===== */
function updateCountdown() {
  const left = EVENT_START - Date.now();
  if (left <= 0) {
    $("countdown").classList.add("done");
    $("countdown").querySelector("h3").textContent = "Bazm boshlandi 🎉";
    return;
  }
  const s = Math.floor(left / 1000);
  $("cdD").textContent = Math.floor(s / 86400);
  $("cdH").textContent = Math.floor((s % 86400) / 3600);
  $("cdM").textContent = Math.floor((s % 3600) / 60);
  $("cdS").textContent = s % 60;
}
updateCountdown();
setInterval(updateCountdown, 1000);

addFlowers();
addDust();
$("openBtn").addEventListener("click", openInvitation);
