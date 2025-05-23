// backgrounds/verticalWave.js

/**
 * Creates dreamy vertical sine wave streaks that float upward.
 * Great for ambient animated backgrounds.
 */
export default function initVerticalWave() {
  const canvas = document.getElementById('vertical-wave-bg') || document.querySelector('canvas');
  if (!canvas) {
    console.warn('No canvas found for vertical wave background.');
    return;
  }

  const ctx = canvas.getContext('2d');

  let width, height;
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class VerticalWave {
    constructor(x, colorHue) {
      this.x = x;
      this.y = height + Math.random() * height;
      this.amplitude = 40 + Math.random() * 40;
      this.frequency = 0.02 + Math.random() * 0.02;
      this.speed = 0.3 + Math.random() * 0.2;
      this.phase = Math.random() * Math.PI * 2;
      this.color = `hsla(${colorHue}, 100%, 85%, 0.08)`;
    }

    reset() {
      this.y = height + Math.random() * height;
    }

    update() {
      this.y -= this.speed;
      if (this.y < -this.amplitude * 2) this.reset();
    }

    draw(time) {
      const gradient = ctx.createLinearGradient(this.x - 20, 0, this.x + 20, 0);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.5, this.color);
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      for (let i = 0; i < height; i += 5) {
        const offset = Math.sin(i * this.frequency + time * 0.001 + this.phase) * this.amplitude;
        ctx.lineTo(this.x + offset, i);
      }

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 40;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 60;
      ctx.stroke();
    }
  }

  // Generate waves
  const waveCount = 25;
  const spacing = window.innerWidth / waveCount;
  const waves = Array.from({ length: waveCount }, (_, i) => {
    const x = i * spacing + spacing / 2;
    const hue = 350 + Math.random() * 40; // pink hue range
    return new VerticalWave(x, hue);
  });

  function animate(time) {
    ctx.clearRect(0, 0, width, height);
    waves.forEach(w => {
      w.update();
      w.draw(time);
    });
    requestAnimationFrame(animate);
  }

  animate();
}
