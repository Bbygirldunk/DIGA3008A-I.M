// scripts/main.js

const pageToModuleMap = {
  'index.html': './backgrounds/particleAnimation.js',
  'Blogs/BlogsCoverPage.html': './backgrounds/aurora.js',
  'Profile/About.html': './backgrounds/veilAurora.js',
  'contact/Contact.html': './backgrounds/waveform.js',
  'Portfolio/Portfolio.html': './backgrounds/verticalWave.js'
};

// Normalize path to strip leading slashes
const currentPath = window.location.pathname.replace(/^\/+/, '');

// Try to match current path to a known module
const matchedEntry = Object.entries(pageToModuleMap).find(([key]) =>
  currentPath.endsWith(key)
);

if (matchedEntry) {
  const modulePath = matchedEntry[1];
  import(modulePath)
    .then((module) => {
      if (typeof module.startAuroraAnimation === 'function') {
        module.startAuroraAnimation();
      } else if (typeof module.startAnimation === 'function') {
        module.startAnimation();
      }
      console.log(`Loaded: ${modulePath}`);
    })
    .catch((err) => {
      console.error(`Failed to load ${modulePath}:`, err);
    });
} else {
  console.warn('No animation module mapped for this page:', currentPath);
}
