const canvas = document.getElementById("waveform-bg");
const ctx = canvas.getContext("2d");

let width, height;
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

///////////////////////////////////////////////////////
// 🛠️ Customization Section
const WAVE_SETTINGS = [
  {
    color: "rgba(255, 182, 193, 0.4)", // LightPink
    amplitude: 60,
    speed: 0.0015,
    phaseOffset: 0,
    thickness: 400,
    glow: 400
  },
  {
    color: "rgba(255, 105, 180, 0.3)", // HotPink
    amplitude: 50,
    speed: 0.0025,
    phaseOffset: Math.PI / 2,
    thickness: 300,
    glow: 400
  },
  {
    color: "rgba(255, 192, 203, 0.25)", // Pink
    amplitude: 40,
    speed: 0.0008,
    phaseOffset: Math.PI,
    thickness: 200,
    glow: 400
  }
];
///////////////////////////////////////////////////////

class Wave {
  constructor(settings) {
    Object.assign(this, settings);
  }

  draw(time) {
    ctx.beginPath();
    for (let x = 0; x <= width; x++) {
      const y =
        height / 2 +
        Math.sin(x * 0.01 + time * this.speed + this.phaseOffset) * this.amplitude;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.glow;
    ctx.stroke();
  }
}

const waves = WAVE_SETTINGS.map(settings => new Wave(settings));

function animate() {
  const time = Date.now();
  ctx.clearRect(0, 0, width, height);
  waves.forEach(w => w.draw(time));
  requestAnimationFrame(animate);
}

animate();
