// scripts/footer.js

document.addEventListener('DOMContentLoaded', () => {
  const note = document.getElementById('footerNote');
  const year = new Date().getFullYear();


  const greetings = [
    "Wishing you a dreamy day ✨",
    "Thanks for visiting my portfolio!",
    "Stay inspired and creative 🌸",
    "Designed with love and pastel dreams"
  ];
  
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  note.textContent = `© ${year} Noccy. ${greeting}`;
});
