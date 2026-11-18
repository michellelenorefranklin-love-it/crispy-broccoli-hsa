"""Generate a 60-second ambient music bed (pad + soft arpeggio) as a 48 kHz stereo WAV. No samples or third-party audio."""
import sys, wave
import numpy as np
SR, DUR, BPM = 48000, 60.0, 92
t = np.arange(int(SR * DUR)) / SR
beat = 60 / BPM
bar = 4 * beat
def hz(n): return 440 * 2 ** ((n - 69) / 12)
# I – V/vii – vi – IV in C major (C, G/B, Am, F), voiced low and warm
chords = [[48, 55, 60, 64, 67], [47, 55, 59, 62, 67], [45, 52, 57, 60, 64], [41, 53, 57, 60, 65]]
pad = np.zeros_like(t); arp = np.zeros_like(t); bass = np.zeros_like(t)
nbars = int(np.ceil(DUR / bar))
for b in range(nbars):
    ch = chords[b % 4]; s0 = b * bar
    i0, i1 = int(s0 * SR), min(len(t), int((s0 + bar + 0.8) * SR))
    tt = t[i0:i1] - s0
    env = np.minimum(1, tt / 0.9) * np.exp(-np.maximum(0, tt - bar) / 0.35)
    for n in ch[1:]:
        f = hz(n)
        pad[i0:i1] += env * (np.sin(2*np.pi*f*tt) + 0.35*np.sin(2*np.pi*2*f*tt + 0.3) + 0.12*np.sin(2*np.pi*3*f*tt)) * (1 + 0.004*np.sin(2*np.pi*0.3*tt))
    fb = hz(ch[0] - 12)
    bass[i0:i1] += np.minimum(1, tt / 0.05) * np.exp(-tt / 1.6) * np.sin(2*np.pi*fb*tt)
    seq = [ch[2] + 12, ch[3] + 12, ch[4] + 12, ch[3] + 12] * 2
    for k, n in enumerate(seq):
        st = s0 + k * beat / 2
        j0, j1 = int(st * SR), min(len(t), int((st + 1.2) * SR))
        if j0 >= len(t): break
        u = t[j0:j1] - st
        f = hz(n)
        arp[j0:j1] += np.minimum(1, u / 0.008) * np.exp(-u / 0.28) * (np.sin(2*np.pi*f*u) + 0.2*np.sin(2*np.pi*2*f*u))
# arpeggio enters after the title, swells through the middle, thins at the close
arp_gain = np.clip((t - 6) / 4, 0, 1) * (1 - 0.5*np.clip((t - 54) / 4, 0, 1))
mix_l = 0.20*pad + 0.32*bass + 0.10*arp*arp_gain
mix_r = 0.20*pad + 0.32*bass + 0.10*np.roll(arp, int(0.012*SR))*arp_gain
# gentle low-pass (one-pole) for warmth
def lp(x, fc=3200):
    a = np.exp(-2*np.pi*fc/SR); y = np.empty_like(x); acc = 0.0
    for i in range(len(x)):
        acc = (1-a)*x[i] + a*acc; y[i] = acc
    return y
fade = np.clip(t / 1.5, 0, 1) * np.clip((DUR - t) / 3.0, 0, 1)
L, R = lp(mix_l) * fade, lp(mix_r) * fade
peak = max(np.abs(L).max(), np.abs(R).max())
L, R = L / peak * 0.6, R / peak * 0.6
data = (np.stack([L, R], axis=1) * 32767).astype('<i2')
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes())
print('wrote', sys.argv[1])
