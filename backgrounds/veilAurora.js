const canvas = document.getElementById('veil-bg') || document.querySelector('canvas');
if (!canvas) {
  console.warn('No canvas found for veil aurora background.');
} else {
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = document.body.scrollHeight;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.body.scrollHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('load', resizeCanvas);

  const layers = [
    { color: '#fbc2eb', amp: 60, speed: 0.2, offset: 0 },
    { color: '#fadadd', amp: 80, speed: 0.15, offset: 100 },
    { color: '#ffaae1', amp: 100, speed: 0.1, offset: 200 },
  ];

  function drawWave(color, amp, speed, offset, time) {
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    for (let x = 0; x <= width; x++) {
      const y = height / 2 + Math.sin((x + offset + time * speed) * 0.01) * amp;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.globalAlpha = 0.2;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    for (let layer of layers) {
      drawWave(layer.color, layer.amp, layer.speed, layer.offset, time);
    }

    requestAnimationFrame(animate);
  }

  animate(0);
}
