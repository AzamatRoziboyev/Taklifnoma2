const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggleBtn");


/* =========================
   KONVERTNI OCHISH
========================= */

function openEnvelope() {

  document
    .getElementById("envelope-screen")
    .classList.add("hidden");

  document
    .getElementById("main-screen")
    .classList.remove("hidden");

  bgMusic.play()
    .then(() => {

      musicBtn.innerText = "⏸";

    })
    .catch((error) => {

      console.log("Audio ijro etilmadi:", error);

    });

}


/* =========================
   MUSIQA
========================= */

async function toggleMusic() {

  try {

    if (bgMusic.paused) {

      await bgMusic.play();

      musicBtn.innerText = "⏸";

    } else {

      bgMusic.pause();

      musicBtn.innerText = "▶";

    }

  } catch (error) {

    console.log("Musiqa xatosi:", error);

  }

}


/* =========================
   SANANI OCHISH
========================= */

const openedCoins = new Set();

function revealDate(id) {

  openedCoins.add(id);

  if (openedCoins.size >= 3) {

    document
      .querySelector(".scratch-coins")
      .style.display = "none";

    document
      .getElementById("revealed-date")
      .classList.remove("hidden");

  }

}


/* =========================
   TAYMER
   19 OKTABR 2026
   18:00
========================= */

const targetDate =
  new Date("2026-10-19T18:00:00+05:00").getTime();


function updateTimer() {

  const now = new Date().getTime();

  const difference = targetDate - now;


  if (difference <= 0) {

    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";

    return;

  }


  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (difference % (1000 * 60 * 60))
    / (1000 * 60)
  );

  const seconds = Math.floor(
    (difference % (1000 * 60))
    / 1000
  );


  document.getElementById("days").innerText =
    String(days).padStart(2, "0");

  document.getElementById("hours").innerText =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").innerText =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").innerText =
    String(seconds).padStart(2, "0");

}


updateTimer();

setInterval(updateTimer, 1000);