// script/main.js

const pageToModuleMap = {
  'index.html': './backgrounds/particleAnimation.js',
  'BlogsCoverPage.html': './backgrounds/aurora.js',
  'About.html': './backgrounds/veilAurora.js',
  'Contact.html': './backgrounds/waveform.js',
  'Portfolio.html': './backgrounds/verticalWave.js'
};

// Get just the current file name (e.g. "About.html")
let filename = window.location.pathname.split('/').pop();

// If no file (e.g. homepage), assume index.html
if (!filename || !filename.endsWith('.html')) {
  filename = 'index.html';
}

console.log("Resolved filename:", filename);

const modulePath = pageToModuleMap[filename];

if (modulePath) {
  import(modulePath)
    .then((module) => {
      if (typeof module.default === 'function') {
        module.default(); // Run animation
      } else {
        console.warn(`Module ${modulePath} has no default export.`);
      }
    })
    .catch((err) => {
      console.error(`Failed to load ${modulePath}:`, err);
    });
} else {
  console.info(`No animation configured for: ${filename}`);
}
