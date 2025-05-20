console.log("Current path:", currentPath);
console.log("Current index:", currentIndex);


const pages = [
  "index.html",
  "Blogs/BlogsCoverPage.html",
  "Profile/About.html",
  "Contact/Contact.html",
  "Portfolio/Portfolio.html"
];

// Normalize current path (strip leading slashes if any)
const currentPath = window.location.pathname.replace(/^\/+/, '');

// Get current page index
const currentIndex = pages.findIndex(path => currentPath.endsWith(path));

// Throttle flag
let isThrottled = false;

document.addEventListener('wheel', function (event) {
  if (currentIndex === -1 || isThrottled) return;

  isThrottled = true;
  setTimeout(() => isThrottled = false, 1000); // Prevent rapid scrolls

  const scrollTop = window.scrollY;
  const scrollHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;

  const atBottom = scrollTop + windowHeight >= scrollHeight - 5;
  const atTop = scrollTop <= 5;

  const nextPage = () => {
    if (currentIndex < pages.length - 1) {
      fadeOutAndNavigate(pages[currentIndex + 1]);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      fadeOutAndNavigate(pages[currentIndex - 1]);
    }
  };

  if (event.deltaY > 0 && atBottom) {
    nextPage();
  } else if (event.deltaY < 0 && atTop) {
    prevPage();
  }
});

// Smooth fade-out transition before navigating
function fadeOutAndNavigate(path) {
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = path; // NO leading slash
  }, 500); // match CSS transition
}
