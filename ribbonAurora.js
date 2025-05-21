const canvas = document.getElementById("ribbon-aurora-bg");
const ctx = canvas.getContext("2d");

let width, height;
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Ribbon {
  constructor() {
    this.points = [];
    this.initPoints();
    this.color = `hsla(${Math.pinkHue() * 360}, 100%, 80%, 0.15)`;
  }

  initPoints() {
    const spacing = 25;
    this.points = [];
    for (let x = 0; x <= canvas.width; x += spacing) {
      this.points.push({
        x,
        baseY: height / 2 + Math.random() * 100 - 50,
        phase: Math.random() * Math.PI * 2,
        amplitude: 40+ Math.random() * 40,
        speed: 0.0002 + Math.random() * 0.0003
      });
    }
  }

  update() {
    const time = Date.now();
    this.points.forEach(p => {
      p.y = p.baseY + Math.sin(time * p.speed + p.phase) * p.amplitude;
    });
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      const p = this.points[i];
      ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 60;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 50;
    ctx.stroke();
  }
}

const ribbons = Array.from({ length: 4}, () => new Ribbon());

function animate() {
  ctx.clearRect(0, 0, width, height);
  ribbons.forEach(r => {
    r.update();
    r.draw(ctx);
  });
  requestAnimationFrame(animate);
}

animate();
