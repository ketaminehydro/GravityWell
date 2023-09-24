const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 100;

const text = "GLITCH EFFECT";
const glitchDuration = 2; // 2 seconds

function drawGlitch() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '100px Varela, sans-serif';
    ctx.fillStyle = 'white';

    // Generate random glitch effect
    for (let i = 0; i < text.length; i++) {
        const x = i * 70 + Math.random() * 10 - 5;
        const y = 80 + Math.random() * 10 - 5;
        ctx.fillText(text[i], x, y);
    }

    setTimeout(drawGlitch, glitchDuration);
}

drawGlitch();
