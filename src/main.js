import "./styles.css";
import ScrollReveal from "scrollreveal";
import emailjs from "@emailjs/browser";
emailjs.init("nIWEWKf0WFuwX1tyU");

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();

  /*   
      The code for sending emails is just an example.

      Create your account at https://www.emailjs.com/ and 
      follow the instructions in the images for sending emails 
      that are in the project folder.
   */

  // serviceID - templateID - #form - publicKey
  emailjs
    .sendForm(
      "service_dospcsd",
      "template_hcaqrvt",
      "#contact-form",
      "nIWEWKf0WFuwX1tyU"
    )

    .then(
      () => {
        // Show sent message
        contactMessage.textContent = "Mensagem enviada com sucesso ✅";

        // Remove message after five seconds
        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);

        // Clear input fields
        contactForm.reset();
      },
      () => {
        // Show error message
        contactMessage.textContent =
          "Mensagem não enviada (erro no serviço) ❌";
      }
    );
};
if (contactForm) {
  contactForm.addEventListener("submit", sendEmail);
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true, // Animations repeat
});

sr.reveal(`.perfil, .contact__form`);
sr.reveal(`.info`, { origin: "left", delay: 800 });
sr.reveal(`.skills`, { origin: "left", delay: 1000 });
sr.reveal(`.about`, { origin: "right", delay: 1200 });
sr.reveal(`.projects__card, .services__card, .experience__card`, {
  interval: 100,
});

/*=============== VIDEO ANIMATION ===============*/
function isMobile() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  );
}

// Desktop (hover)
if (!isMobile()) {
  document.querySelectorAll(".video-preview").forEach((preview) => {
    const video = preview.querySelector(".projects__video");

    preview.addEventListener("mouseenter", () => {
      video.play();
      preview.classList.add("video-visible");
    });

    preview.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0; // Reinicia vídeo ao início
      preview.classList.remove("video-visible");
    });
  });
}

// Mobile (scroll - Intersection Observer)
if (isMobile()) {
  document.querySelectorAll(".projects__video").forEach((video) => {
    video.setAttribute("playsinline", "playsinline");
    video.setAttribute("muted", "muted");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        const preview = video.closest(".video-preview");
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          if (preview) preview.classList.add("video-visible");
        } else {
          video.pause();
          video.currentTime = 0;
          if (preview) preview.classList.remove("video-visible");
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  document.querySelectorAll(".projects__video").forEach((video) => {
    observer.observe(video);
  });
}

/*=============== FLOATIN ACTION BUTTTON ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const fabButton = document.getElementById("fab-btn");
  const fabIcon = document.querySelector(".fab-icon");
  const fabOptions = document.querySelector(".fab-options");
  const overlay = document.querySelector(".overlay");
  const options = document.querySelectorAll(".fab-option");

  fabButton.addEventListener("click", () => {
    const isActive = fabButton.classList.contains("active");
    fabButton.classList.toggle("active");
    overlay.style.opacity = isActive ? "0" : "1";
    overlay.style.visibility = isActive ? "hidden" : "visible";
    fabOptions.style.opacity = isActive ? "0" : "1";
    fabOptions.style.visibility = isActive ? "hidden" : "visible";
    fabOptions.style.transform = isActive ? "scale(0.9)" : "scale(1)";
    fabIcon.style.transform = isActive ? "rotate(0deg)" : "rotate(45deg)";
    options.forEach((option, index) => {
      setTimeout(() => {
        option.style.opacity = isActive ? "0" : "1";
        option.style.transform = isActive
          ? "translateY(10px)"
          : "translateY(0)";
      }, index * 100);
    });
  });

  overlay.addEventListener("click", () => {
    fabButton.click();
  });
});

const fabTrigger = document.getElementById("fab-btn");
if (fabTrigger) {
  fabTrigger.addEventListener("click", function () {
    this.classList.toggle("ativo");
  });
}
