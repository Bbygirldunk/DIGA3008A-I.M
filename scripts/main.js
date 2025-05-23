// script/main.js

const pageToModuleMap = {
  'index.html': '/backgrounds/particleAnimation.js',
  'Blogs/BlogsCoverPage.html': '/backgrounds/aurora.js',
  'Profile/About.html': '/backgrounds/veilAurora.js',
  'Contact/Contact.html': '/backgrounds/waveform.js',
  'Portfolio/Portfolio.html': '/backgrounds/verticalWave.js'
};

// Extract path like "Blogs/BlogsCoverPage.html"
const pathParts = window.location.pathname.split('/').filter(Boolean);
const path = pathParts.slice(-2).join('/');

// Attempt to import the matched module
const modulePath = pageToModuleMap[path];

if (modulePath) {
  import(modulePath)
    .then((module) => {
      if (typeof module.default === 'function') {
        module.default(); // Execute the animation initializer
      } else {
        console.warn(`Module ${modulePath} does not export a default function.`);
      }
    })
    .catch((err) => {
      console.error(`Failed to load module ${modulePath}:`, err);
    });
} else {
  console.info(`No animation configured for: ${path}`);
}
