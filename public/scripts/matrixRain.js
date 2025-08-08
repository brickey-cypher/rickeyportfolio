// src/scripts/matrixRain.js
export function initMatrixRain() {
  console.log('Matrix script started');
  const canvas = document.getElementById('matrix-overlay');
  if (!canvas) {
    console.error('Matrix canvas not found');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Canvas context not available');
    return;
  }

  const letters =
    'アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  const fontSize = 16;
  let columns = Math.floor(window.innerWidth / fontSize);
  let drops = new Array(columns).fill(1);
  let intervalId;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transforms
    ctx.scale(dpr, dpr);

    columns = Math.floor(window.innerWidth / fontSize);
    drops = new Array(columns).fill(1);

    console.log(`Canvas resized: ${canvas.width}x${canvas.height}, DPR: ${dpr}`);

    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(draw, 35);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.8; // Semi-transparent characters
    ctx.fillStyle = '#00f6ff'; // bright blue
    ctx.font = fontSize + 'px monospace';

    drops.forEach((y, x) => {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, x * fontSize, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[x] = 0;
      }
      drops[x]++;
    });
  }

  // Initial setup
  resizeCanvas();

  // Resize listener
  window.addEventListener('resize', resizeCanvas);
}
