// script/main.js

const repoName = 'DIGA3008A-I.M'; 

const pageToModuleMap = {
  'index.html': 'backgrounds/particleAnimation.js',
  'Blogs/BlogsCoverPage.html': 'backgrounds/aurora.js',
  'Profile/About.html': 'backgrounds/veilAurora.js',
  'Contact/Contact.html': 'backgrounds/waveform.js',
  'Portfolio/Portfolio.html': 'backgrounds/verticalWave.js'
};

// Extract the current page path relative to the repository root
const pathParts = window.location.pathname.split('/').filter(Boolean);
const relativePath = pathParts.slice(-2).join('/');

console.log("Resolved path:", relativePath);

const moduleFile = pageToModuleMap[relativePath];

if (moduleFile) {
  const modulePath = `/${repoName}/${moduleFile}`;
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
  console.info(`No background animation configured for: ${relativePath}`);
}
