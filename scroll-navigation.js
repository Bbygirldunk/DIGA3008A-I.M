const pages = [
    "index.html",
    "/Blogs/BlogsCoverPage.html",
    "/Profile/About.html",
    "/contact/Contact.html",
    "/Portfolio/Portfolio.html"
  ];
  
  // Normalize current path: remove leading slashes
  const currentPath = window.location.pathname.replace(/^\/+/, '');
  
  // Get the current index based on full relative path
  const currentIndex = pages.findIndex(path => currentPath.endsWith(path));
  
  document.addEventListener('wheel', function (event) {
    if (currentIndex === -1) return; // Exit if current page isn't in the array
  
    if (event.deltaY > 0) {
      // Scroll down
      if (currentIndex < pages.length - 1) {
        window.location.href = pages[currentIndex + 1];
      }
    } else {
      // Scroll up
      if (currentIndex > 0) {
        window.location.href = pages[currentIndex - 1];
      }
    }
  });
  