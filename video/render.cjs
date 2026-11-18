// Renders scenes.html frame by frame and pipes JPEG frames into ffmpeg.
// Usage: node render.cjs <out.mp4> [fps] [audio.wav]   |   node render.cjs --stills <dir> t1,t2,...
const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const path = require('node:path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + path.resolve(__dirname, 'scenes.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  if (process.argv[2] === '--stills') {
    for (const t of process.argv[4].split(',').map(Number)) {
      await p.evaluate(t => window.render(t), t);
      await p.screenshot({ path: path.join(process.argv[3], `still-${String(t).padStart(5, '0')}.png`) });
    }
    await b.close(); return;
  }
  const out = process.argv[2], fps = Number(process.argv[3] || 30), audio = process.argv[4];
  const args = ['-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-'];
  if (audio) args.push('-i', audio, '-c:a', 'aac', '-b:a', '192k', '-shortest');
  args.push('-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-movflags', '+faststart', out);
  const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'ignore', 'inherit'] });
  const total = Math.round(60 * fps);
  for (let f = 0; f < total; f++) {
    await p.evaluate(t => window.render(t), f / fps);
    const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 300 === 0) console.error(`frame ${f}/${total}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await b.close();
})();
