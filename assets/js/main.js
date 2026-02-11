document.addEventListener("DOMContentLoaded", () => {
  const profilePic = document.getElementById("profile-pic");
  const sections = document.querySelectorAll("section");

  // Configuración de revelación inicial (más dramática pero suave)
  const revealOption = {
    threshold: 0.1,
    rootMargin: "0px 0px -80px 0px",
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        sectionObserver.unobserve(entry.target);
      }
    });
  }, revealOption);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Efecto de inclinación ligera para las cards (Efecto en las cards)
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
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  // Animación de entrada para el perfil
  if (profilePic) {
    profilePic.style.opacity = "0";
    profilePic.style.transform = "scale(0.8) translateY(-20px)";
    setTimeout(() => {
      profilePic.style.transition = "all 1.4s cubic-bezier(0.22, 1, 0.36, 1)";
      profilePic.style.opacity = "1";
      profilePic.style.transform = "scale(1) translateY(0)";
    }, 200);
  }
});


