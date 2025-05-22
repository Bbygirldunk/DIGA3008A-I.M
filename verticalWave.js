const canvas = document.getElementById('vertical-wave-bg');
const ctx = canvas.getContext('2d');

let width, height;
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class VerticalWave {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = height + Math.random() * height;
    this.amplitude = 40 + Math.random() * 40;
    this.frequency = 0.02 + Math.random() * 0.02;
    this.speed = 0.5 + Math.random() * 0.3;
    this.phase = Math.random() * Math.PI * 2;
    this.color = `hsla(${330 + Math.random() * 20}, 100%, 85%, 0.15)`; // Increased alpha
  }

  update(time) {
    this.y -= this.speed;
    if (this.y < -this.amplitude * 2) this.reset();
  }

  draw(time) {
    const gradient = ctx.createLinearGradient(this.x - 30, 0, this.x + 30, 0);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.5, this.color);
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    for (let i = 0; i <= height; i += 5) {
      const offset = Math.sin(i * this.frequency + time * 0.001 + this.phase) * this.amplitude;
      ctx.lineTo(this.x + offset, i);
    }

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 20; // Thicker line for aura feel
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 40;
    ctx.stroke();
  }
}

const waves = Array.from({ length: 25 }, () => new VerticalWave());

function animate(time) {
  ctx.clearRect(0, 0, width, height);
  waves.forEach(w => {
    w.update(time);
    w.draw(time);
  });
  requestAnimationFrame(animate);
}
animate();
