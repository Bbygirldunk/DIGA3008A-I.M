// script/main.js

// Map of page filenames to their respective background animation modules
const pageToModuleMap = {
  'index.html': '/backgrounds/particleAnimation.js',
  'BlogsCoverPage.html': '/backgrounds/aurora.js',
  'About.html': '/backgrounds/veilAurora.js',
  'Contact.html': '/backgrounds/waveform.js',
  'Portfolio.html': '/backgrounds/verticalWave.js'
};

// Extract only the filename from the current path
const path = window.location.pathname.split('/').pop();

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
  console.info(`No background animation configured for: ${path}`);
}

console.log("Resolved path:", path);
