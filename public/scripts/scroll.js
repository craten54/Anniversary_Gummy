/* === COPY SEMUA KODE INI KE scroll.js === */
window.history.scrollRestoration = "manual";
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
  console.log("scroll.js initialized 🎀");

  // --- 1. INISIALISASI ELEMEN ---
  const opening = document.getElementById("opening-letter");
  const flap = document.getElementById("letter-cover");
  const sfxOpen = document.getElementById("sfx-open");
  const bgmMain = document.getElementById("bgm-main");

  // --- 2. LOGIKA OPENING LETTER ---
  if (opening && flap) {
    document.body.style.overflow = "hidden";
    let startY = 0;
    let isDragging = false;

    flap.addEventListener("pointerdown", (e) => {
      isDragging = true;
      startY = e.clientY;
      flap.setPointerCapture(e.pointerId);
    });

    flap.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY;

      if (deltaY < -80) {
        isDragging = false;
        
        if (sfxOpen) {
          sfxOpen.currentTime = 0;
          sfxOpen.play(); 
        }
        
        flap.classList.add("open");

        setTimeout(() => {
          opening.classList.add("hide");
          document.body.style.overflow = "auto";
          
          if (bgmMain) {
            bgmMain.volume = 0.005;
            bgmMain.play().catch(err => {
              console.log("Autoplay dicegah browser, perlu interaksi user.");
            });
          }
        }, 1200); 
      }
    });

    flap.addEventListener("pointerup", () => { isDragging = false; });
  }

  // --- 3. LOGIKA TRIFOLD CARD (NEW CONCEPT) ---
  const flaps = document.querySelectorAll('.flap');

  flaps.forEach(flap => {
    let startX = 0;
    let isDragging = false;
    const isLeft = flap.classList.contains('flap-left');

    flap.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startX = e.clientX;
      flap.setPointerCapture(e.pointerId);
      // Matikan transisi saat sedang di-drag agar responsif
      flap.style.transition = "none";
    });

    flap.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const moveX = e.clientX - startX;

      // Logika Tarik:
      // Pintu Kiri: Jika ditarik ke kiri (moveX negatif)
      // Pintu Kanan: Jika ditarik ke kanan (moveX positif)
      if (isLeft && moveX < -60) {
        flap.classList.add('is-open');
        isDragging = false;
      } 
      if (!isLeft && moveX > 60) {
        flap.classList.add('is-open');
        isDragging = false;
      }
    });

    flap.addEventListener('pointerup', () => {
      isDragging = false;
      // Kembalikan transisi halus
      flap.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    });

    // Tambahan: Klik sekali juga bisa untuk buka/tutup
    flap.addEventListener('click', () => {
      flap.classList.toggle('is-open');
    });
  });

  // --- 4. LOGIKA TARIK PITA (MESSAGES FOR US) ---
  const track = document.getElementById("ribbon-track");
  if (track) {
    let isDraggingRibbon = false;
    let startX;
    let currentTranslate = 0;

    track.style.transform = `translateX(0px)`;

    track.addEventListener("pointerdown", (e) => {
      isDraggingRibbon = true;
      startX = e.pageX - currentTranslate;
      track.style.cursor = "grabbing";
      track.style.transition = "none";
    });

    window.addEventListener("pointermove", (e) => {
      if (!isDraggingRibbon) return;
      let x = e.pageX - startX;
      
      const maxPull = -(track.scrollWidth - 100); 
      if (x > 0) x = 0; 
      if (x < maxPull) x = maxPull;

      currentTranslate = x;
      track.style.transform = `translateX(${x}px)`;
    });

    window.addEventListener("pointerup", () => {
      isDraggingRibbon = false;
      track.style.cursor = "grab";
      track.style.transition = "transform 0.6s cubic-bezier(0.2, 0, 0.2, 1)";
    });
  }

  // --- 5. SCROLL REVEAL & TIMELINE ---
  const sections = document.querySelectorAll(".fade-section");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach((s, i) => {
    s.style.transitionDelay = `${i * 0.1}s`;
    sectionObserver.observe(s);
  });

  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineSection = document.querySelector(".timeline");
  if (timelineSection) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineItems.forEach((item, index) => {
            setTimeout(() => { item.classList.add("show"); }, index * 400);
          });
          timelineObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    timelineObserver.observe(timelineSection);
  }

  // --- 6. SPARKLES ---
  const sparkleContainer = document.getElementById("sparkle-container");
  if (sparkleContainer) {
    const sparkles = ["🧸", "💗", "💖", "🍬", "🍰"];
    setInterval(() => {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.style.left = Math.random() * 100 + "vw";
      sparkle.style.fontSize = (8 + Math.random() * 14) + "px";
      sparkle.style.animationDuration = (6 + Math.random() * 6) + "s";
      sparkleContainer.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 12000);
    }, 450);
  }
});