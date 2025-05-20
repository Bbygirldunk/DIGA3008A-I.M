const canvas = document.getElementById("aurora-bg");
const ctx = canvas.getContext("2d");

let width, height;
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Define aurora waves
const auroras = [];
const colors = ["#fbc2eb", "#fcd5ce", "#fadadd"];


for (let i = 0; i < 3; i++) {
  auroras.push({
    amplitude: 30 + Math.random() * 40,
    frequency: 0.002 + Math.random() * 0.002,
    phase: Math.random() * 1000,
    speed: 0.01 + Math.random() * 0.01,
    color: colors[i % colors.length],
    verticalOffset: height / 3 + i * 50
  });
}

function drawAurora() {
  ctx.clearRect(0, 0, width, height);

  for (let aurora of auroras) {
    ctx.beginPath();
    ctx.moveTo(0, aurora.verticalOffset);

    for (let x = 0; x <= width; x++) {
      const y = aurora.amplitude * Math.sin(x * aurora.frequency + aurora.phase) + aurora.verticalOffset;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, `${aurora.color}55`);
    gradient.addColorStop(1, `${aurora.color}00`);

    ctx.fillStyle = gradient;
    ctx.fill();

    aurora.phase += aurora.speed;
  }

  requestAnimationFrame(drawAurora);
}

drawAurora();
