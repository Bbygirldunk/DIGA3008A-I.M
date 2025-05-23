// script/main.js

const basePath = '/DIGA3008A-I.M'; // GitHub Pages subdirectory

const pageToModuleMap = {
  'index.html': `${basePath}/backgrounds/particleAnimation.js`,
  'BlogsCoverPage.html': `${basePath}/backgrounds/aurora.js`,
  'About.html': `${basePath}/backgrounds/veilAurora.js`,
  'Contact.html': `${basePath}/backgrounds/waveform.js`,
  'Portfolio.html': `${basePath}/backgrounds/verticalWave.js`
};

// Get the current file name from URL
let filename = window.location.pathname.split('/').pop();

// Default to index.html if empty
if (!filename || !filename.endsWith('.html')) {
  filename = 'index.html';
}

console.log("Resolved path:", filename);

const modulePath = pageToModuleMap[filename];

if (modulePath) {
  import(modulePath)
    .then((module) => {
      if (typeof module.default === 'function') {
        module.default();
      } else {
        console.warn(`Module ${modulePath} has no default export.`);
      }
    })
    .catch((err) => {
      console.error(`Failed to load module ${modulePath}:`, err);
    });
} else {
  console.info(`No background animation configured for: ${filename}`);
}
