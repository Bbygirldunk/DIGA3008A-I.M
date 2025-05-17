const scrollUpBtn = document.getElementById("scrollUpBtn");
const scrollDownBtn= document.getElementById("scrollDownBtn");
let hasScollDown = false;

function scrollToNext() {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
}

function scrollToTop(){
    window.scrollTo({top: 0, behavior: "smooth"})
}
 
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
      // User scrolled down
      scrollUpBtn.classList.add('show');
      scrollDownBtn.classList.remove('show');
      hasScrolledDown = true;
    } else {
      // At the top
      scrollUpBtn.classList.remove('show');

      if (hasScrolledDown) {
        // Only show scroll-down after user has scrolled once
        scrollDownBtn.classList.add('show');
      } else {
        scrollDownBtn.classList.remove('show');
      }
    }
  });

  window.addEventListener('DOMContentLoaded', () => {
    // On initial load, hide both buttons
    scrollUpBtn.classList.remove('show');
    scrollDownBtn.classList.remove('show');
  });