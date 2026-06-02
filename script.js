// SBM Arquitetura com Propósito - Interações premium

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Animação suave ao rolar
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".section-reveal").forEach(section => {
  observer.observe(section);
});

// Filtro do portfólio
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryImages = document.querySelectorAll(".gallery img");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    galleryImages.forEach(image => {
      const show = filter === "all" || image.dataset.category === filter;
      image.style.display = show ? "block" : "none";
    });
  });
});

// Modal de imagens
const modal = document.getElementById("imageModal");
const modalImage = modal.querySelector("img");
const modalClose = modal.querySelector(".modal-close");

galleryImages.forEach(image => {
  image.addEventListener("click", () => {
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modal.classList.add("open");
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("open");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("open");
  }
});

// Carousel de depoimentos
const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach(item => item.classList.remove("active"));
  testimonials[index].classList.add("active");
}

prevBtn.addEventListener("click", () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});

nextBtn.addEventListener("click", () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});

setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);


// Formulário inteligente para WhatsApp
const leadForm = document.getElementById("leadForm");
if (leadForm) {
  leadForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeCliente").value;
    const servico = document.getElementById("servicoCliente").value;
    const local = document.getElementById("localCliente").value;
    const mensagem = document.getElementById("mensagemCliente").value;

    const texto = `Olá, Silvana. Vim pelo site da SBM Arquitetura.%0A%0A` +
      `Meu nome: ${encodeURIComponent(nome)}%0A` +
      `Serviço de interesse: ${encodeURIComponent(servico)}%0A` +
      `Cidade/Bairro: ${encodeURIComponent(local)}%0A` +
      `Minha necessidade: ${encodeURIComponent(mensagem)}%0A%0A` +
      `Gostaria de receber uma orientação inicial.`;

    window.open(`https://wa.me/5511982738757?text=${texto}`, "_blank");
  });
}
