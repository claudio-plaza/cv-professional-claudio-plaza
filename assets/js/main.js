document.addEventListener("DOMContentLoaded", () => {
  const profilePic = document.getElementById("profile-pic");
  const sections = document.querySelectorAll("section");

  // Scroll Interactivo para la imagen de perfil
  window.addEventListener("scroll", () => {
    const scrollValue = window.scrollY;

    // Efecto de escala y opacidad progresivo
    if (scrollValue < 400) {
      const scale = Math.max(0.6, 1 - scrollValue / 600);
      const opacity = Math.max(0.2, 1 - scrollValue / 400);
      const blur = Math.min(4, scrollValue / 100);

      profilePic.style.transform = `scale(${scale})`;
      profilePic.style.opacity = opacity;
      profilePic.style.filter = `blur(${blur}px)`;
    } else {
      profilePic.style.opacity = 0;
    }
  });

  // Observer para animaciones de entrada (Reveal on Scroll)
  const revealOption = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        sectionObserver.unobserve(entry.target);
      }
    });
  }, revealOption);

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    sectionObserver.observe(section);
  });

  // Efecto Hover 3D ligero para las glass-cards
  const cards = document.querySelectorAll(".glass-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });
});
