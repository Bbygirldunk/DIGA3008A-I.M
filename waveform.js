const canvas = document.getElementById("waveform-bg");
const ctx = canvas.getContext("2d");

let width, height;
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Wave {
  constructor(color, amplitude, speed, phaseOffset) {
    this.color = color;
    this.amplitude = amplitude;
    this.speed = speed;
    this.phase = phaseOffset;
  }

  draw(time) {
    ctx.beginPath();
    for (let x = 0; x <= width; x++) {
      const y =
        height / 2 +
        Math.sin(x * 0.01 + time * this.speed + this.phase) * this.amplitude;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.stroke();
  }
}

const waves = [
  new Wave("rgba(255, 182, 193, 0.4)", 60, 0.0015, 0),         // LightPink
  new Wave("rgba(255, 105, 180, 0.25)", 50, 0.001, Math.PI / 2), // HotPink
  new Wave("rgba(255, 192, 203, 0.2)", 40, 0.0008, Math.PI)      // Pink
];

function animate() {
  const time = Date.now();
  ctx.clearRect(0, 0, width, height);
  waves.forEach(w => w.draw(time));
  requestAnimationFrame(animate);
}

animate();
