const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggleBtn');

// Konvertni ochish va musiqani boshlash
function openEnvelope() {
  document.getElementById('envelope-screen').classList.add('hidden');
  document.getElementById('main-screen').classList.remove('hidden');
  
  // Musiqani chalish
  bgMusic.play().then(() => {
    musicBtn.innerText = "⏸";
  }).catch(err => {
    console.log("Audio ijro etishda xatolik:", err);
  });
}

// Musiqani to'xtatish/yoqish
function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.innerText = "⏸";
  } else {
    bgMusic.pause();
    musicBtn.innerText = "▶";
  }
}

// Sanani ko'rsatish
let clicks = 0;
function revealDate(id) {
  clicks++;
  if (clicks >= 3) {
    document.querySelector('.scratch-coins').style.display = 'none';
    document.getElementById('revealed-date').classList.remove('hidden');
  }
}

// Karta raqamini nusxalash
function copyCard() {
  const cardNum = document.getElementById('cardNumber').innerText;
  navigator.clipboard.writeText(cardNum.replace(/\s+/g, ''));
  alert("Karta raqami nusxalandi!");
}

// Taymer mantiqi (20-oktabr 2026-yil, Seshanba)
const targetDate = new Date("October 20, 2026 18:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  } else {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
  }
}, 1000);