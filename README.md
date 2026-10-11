# Ars Adversaria: Deep Generative Artwork Synthesis

An academic replication and comparative study evaluating deep generative architectures on the diverse WikiArt dataset (22,632 paintings across 27 art movements).

---

## 🏛️ Architectures Compared

| Architecture | Full Formulation | Conditioning | Key Innovation |
| :--- | :--- | :--- | :--- |
| **DCGAN** | Deep Convolutional GAN | Unconditioned ($z \in \mathbb{R}^{150}$) | Fractional-strided deconvolutions & Batch Normalization across all layers. |
| **cGAN** | Conditional GAN | Multi-Class Vector ($y \in \mathbb{R}^{27}$) | Deterministic genre/movement steering + Discriminator Gaussian noise decay to mitigate mode collapse. |
| **CAN** | Creative Adversarial Network | Style Ambiguity Maximization | Normalized Shannon entropy penalty on style classification head to encourage autonomous aesthetic exploration. |

---

## 📂 Repository Structure

```
GAN/
├── GAN-Artwork-Generation/       # PyTorch Model & Training Pipeline
│   ├── dataloader.py             # Optimized PyTorch DataLoader (workers=4)
│   ├── parameters.py             # Hyperparameters (Batch 128, lr 0.0002, beta1 0.5)
│   ├── train.py                  # Standalone GPU training loop with auto-checkpointing
│   ├── custom_dataset.py         # WikiArt folder/subset loader & normalization
│   ├── output/                   # Checkpoints & epoch sample grids (Epoch 0 - 40+)
│   └── Final_Project_Report.pdf  # Project academic paper reference
│
├── web-ui/                       # Interactive Research & Exhibition Portal
│   ├── src/                      # React 19 + TypeScript + Vite components
│   │   ├── components/           # Side-by-side comparator, gallery, loss chart, telemetry
│   │   ├── data/                 # Model architecture schemas & 27 styles
│   │   └── App.tsx               # Main portal application
│   └── public/assets/            # High-resolution benchmark outputs & epoch progression
│
└── README.md                     # Project documentation
```

---

## ⚡ Hardware Acceleration & Empirical Benchmarks

- **GPU:** NVIDIA GeForce RTX 4050 Laptop GPU (6,141 MiB VRAM)
- **Framework:** PyTorch 2.6.0 + CUDA 12.4
- **Dataloader Optimization:** Multi-threaded asynchronous batch resizing (4 workers), reducing batch processing time from ~4.7s to **1.87s/batch** (0.0529s pure compute).
- **Convergence:** Stable Nash equilibrium achieved at **Epoch 30+** ($L_D \approx 0.61$, $L_G \approx 2.69$).

---

## 🚀 Quickstart

### 1. Web Exhibition Portal
```bash
cd web-ui
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 2. Training the PyTorch GAN
```bash
cd GAN-Artwork-Generation
.\env\Scripts\python.exe train.py
```
Checkpoints and generated sample grids are saved continuously to `GAN-Artwork-Generation/output/`.
