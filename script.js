function menuBtn() {
    const navBtn = document.querySelector('.nav-links');
    navBtn.classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active')
    });
});

// FORM ERASE AFTER SUBMIT 
document.getElementById("contactForm").addEventListener("submit", function() {
  // Wait a tiny moment, then clear
  setTimeout(() => {
    this.reset();
  }, 100);
});

window.addEventListener("load", () => {
    document.getElementById("loader").classList.add("hide");
});

// Scroll animations
const cards = document.querySelectorAll(".card, .cards, .address");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

cards.forEach((card) => {
  observer.observe(card);
});