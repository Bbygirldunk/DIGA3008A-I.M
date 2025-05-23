

const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let stars = [];
let shootingStars = [];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Create stars
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.3 + 0.1,
    opacity: Math.random() * 0.5 + 0.5
  });
}

function drawStars() {
  for (let star of stars) {
    star.y += star.speed;
    if (star.y > height) star.y = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "white";
    ctx.fill();
  }
}

function maybeCreateShootingStar() {
  if (Math.random() < 0.01) {
    shootingStars.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.5,
      length: Math.random() * 80 + 100,
      speed: Math.random() * 10 + 6,
      angle: Math.PI / 4,
      alpha: 1
    });
  }
}

function drawShootingStars() {
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    let star = shootingStars[i];
    const dx = Math.cos(star.angle) * star.speed;
    const dy = Math.sin(star.angle) * star.speed;

    star.x += dx;
    star.y += dy;
    star.alpha -= 0.01;

    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x - dx * 5, star.y - dy * 5);
    ctx.strokeStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    if (star.alpha <= 0) {
      shootingStars.splice(i, 1);
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  drawStars();
  maybeCreateShootingStar();
  drawShootingStars();
  requestAnimationFrame(animate);
}

animate();
