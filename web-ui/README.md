# Ars Adversaria | Deep Generative Artwork Synthesis Web Portal

An interactive, editorial, research-grade comparison portal for generative art architectures:
- **DCGAN** (Deep Convolutional Generative Adversarial Network)
- **cGAN** (Conditional GAN across 27 artistic movements)
- **CAN** (Creative Adversarial Network deviating from established styles via entropy maximization)

---

## Features
- **Multi-Model Side-by-Side Comparator:** Real-time architectural, dimensional, and formulation comparison.
- **Interactive Epoch Synthesis Gallery:** Scrub through training progress (Epoch 0 to 35+) to observe noise evolving into painterly brushwork.
- **Conditional 27-Style Matrix:** Real paintings vs. generated equivalents conditioned on one-hot style vectors.
- **Mathematical Formulations:** Interactive breakdown of MinMax BCE, conditional losses, and Shannon entropy maximization.
- **Live Hardware Telemetry & Convergence Dynamics:** Real-time RTX 4050 GPU telemetry, batch latencies, and interactive SVG loss curves.
- **High-Resolution Inspection Lightbox:** Full-screen modal for inspecting generated canvases.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
