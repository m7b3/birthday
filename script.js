document.addEventListener("DOMContentLoaded", () => {
  /* ELEMENTS */
  const loadingScreen = document.getElementById("loading-screen");
  const loadingEl = document.getElementById("loading-text");

  const surpriseBtn = document.querySelector(".surprise-btn");
  const gallerySection = document.getElementById("gallery");
  const finalSection = document.getElementById("final");

  const giftBox = document.getElementById("giftBox");
  const letter = document.getElementById("letter");
  const letterTextEl = document.getElementById("letter-text");

  const giftSound = document.getElementById("giftSound");
  const typeSound = document.getElementById("typeSound");

  const achievementSection = document.getElementById("achievement");

  /* LOADING TYPEWRITER */
  const loadingText = "It's coming... ✨🎉🤍";
  let i = 0;

  function typeLoading() {
    if (i < loadingText.length) {
      loadingEl.textContent += loadingText.charAt(i);
      i++;
      setTimeout(typeLoading, 80);
    }
  }
  typeLoading();

  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 3500);

  /* SURPRISE BUTTON */
  surpriseBtn.addEventListener("click", () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });

    gallerySection.scrollIntoView({ behavior: "smooth" });
    gallerySection.classList.add("show");

    const images = document.querySelectorAll(".gallery img");

    images.forEach((img, index) => {
      setTimeout(() => {
        img.classList.add("show");

        // After last image → show final section
        if (index === images.length - 1) {
          setTimeout(() => {
            finalSection.scrollIntoView({ behavior: "smooth" });
            finalSection.classList.add("show");
          }, 800);
        }
      }, index * 400);
    });
  });

  const letterHeader = "Dear Khushi,";

  const letterBody = `
It still feels special to think that we met socially on 6th November, and spoke properly for the first time on 15th November, talking until almost 2 a.m.

In such a short time, you became a friend who made me feel safe without us ever meeting.

You honestly point out my mistakes, help me see what I am doing wrong, and encourage me to be better.
I truly respect that.

Your care, patience, and understanding mean a lot to me.
I am grateful for this simple, genuine friendship and hope it continues to grow with trust and positivity.
Thank you for being you.
`;

  const letterRegards = `
Regards,
Mnv.
`;

  /* GIFT CLICK */
  giftBox.addEventListener("click", () => {
    giftSound.play();

    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.7 },
    });

    giftBox.style.display = "none";
    letter.classList.add("unfold");
    typeLetter();
  });

  function typeLetter() {
    document.getElementById("letter-header").textContent = letterHeader;

    const words = letterBody.split(" ");
    let index = 0;

    const interval = setInterval(() => {
      letterTextEl.innerHTML += words[index] + " ";

      typeSound.currentTime = 0;
      typeSound.play();

      if (navigator.vibrate) navigator.vibrate(15);

      index++;

      if (index === words.length) {
        clearInterval(interval);

        document.getElementById("letter-regards").textContent = letterRegards;

        setTimeout(() => {
          achievementSection.scrollIntoView({ behavior: "smooth" });
          achievementSection.classList.add("show");

          confetti({
            particleCount: 250,
            spread: 120,
            origin: { y: 0.6 },
          });
        }, 9000);
      }
    }, 140);
  }
});
