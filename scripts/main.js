// script/main.js

// Map page filenames to their animation modules
const pageToModuleMap = {
  'index.html': '/backgrounds/particleAnimation.js',
  'BlogsCoverPage.html': '/backgrounds/aurora.js',
  'About.html': '/backgrounds/veilAurora.js',
  'Contact.html': '/backgrounds/waveform.js',
  'Portfolio.html': '/backgrounds/verticalWave.js'
};

// Extract filename or fallback to index.html
let path = window.location.pathname.split('/').pop();
if (!path || !path.includes('.html')) {
  path = 'index.html';
}

const modulePath = pageToModuleMap[path];

if (modulePath) {
  import(modulePath)
    .then((module) => {
      if (typeof module.default === 'function') {
        module.default(); // Initialize background
      } else {
        console.warn(`Module ${modulePath} does not export a default function.`);
      }
    })
    .catch((err) => {
      console.error(`Failed to load module ${modulePath}:`, err);
    });
} else {
  console.info(`No background animation configured for: ${path}`);
}

console.log("Resolved path:", path);
