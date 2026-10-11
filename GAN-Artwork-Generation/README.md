# Generative Artwork Synthesis: Comparative Study of DCGAN, cGAN, and CAN

## Project Overview
This repository implements and evaluates deep generative architectures for synthesizing fine art from the WikiArt dataset. It provides an end-to-end machine learning pipeline, PyTorch models, training checkpoints, empirical loss evaluations, and an interactive research portal.

The study investigates three generative paradigms:
1. **DCGAN (Deep Convolutional GAN)**: Baseline unconditional generative model learning continuous latent representations of artwork paintings.
2. **cGAN (Conditional GAN)**: Supervised conditional model conditioned on 27 historical art movement labels for deterministic style steering.
3. **CAN (Creative Adversarial Network)**: Novelty-driven formulation incorporating style ambiguity entropy to encourage aesthetic deviation beyond standard stylistic boundaries.

---

## 🏛️ Model Architectures & Loss Formulations

| Model | Conditioning / Paradigm | Generator Loss ($\mathcal{L}_G$) | Discriminator Loss ($\mathcal{L}_D$) |
| :--- | :--- | :--- | :--- |
| **DCGAN** | Unconditioned ($z \in \mathbb{R}^{100}$) | $-\mathbb{E}_{z}[\log D(G(z))]$ | $-\mathbb{E}_{x}[\log D(x)] - \mathbb{E}_{z}[\log(1 - D(G(z)))]$ |
| **cGAN** | Class-Conditioned ($y \in \{1,\dots,27\}$) | $-\mathbb{E}_{z,y}[\log D(G(z, y), y)]$ | $-\mathbb{E}_{x,y}[\log D(x, y)] - \mathbb{E}_{z,y}[\log(1 - D(G(z, y), y))]$ |
| **CAN** | Creative Ambiguity Maximization | $-\mathbb{E}_{z}[\log D_r(G(z))] - \lambda \mathcal{H}(D_s(G(z)))$ | $-\mathbb{E}_{x}[\log D_r(x)] - \mathbb{E}_{z}[\log(1 - D_r(G(z)))] + \mathcal{L}_{\text{style\_real}}$ |

---

## 📊 Dataset & Preprocessing

- **Dataset**: WikiArt collection comprising 22,632 paintings across 27 recognized art movements (Impressionism, Post-Impressionism, Expressionism, Surrealism, Baroque, Renaissance, Cubism, etc.).
- **Resolution**: $64 \times 64 \times 3$ RGB normalized to $[-1, 1]$.
- **Data Augmentation**: Random horizontal flipping, center cropping, and multi-threaded asynchronous batch prefetching (PyTorch DataLoader with 4 workers).

---

## ⚡ Empirical Training & Convergence

- **Hardware**: Trained on NVIDIA GeForce RTX 4050 Laptop GPU (CUDA 12.4).
- **Optimization**: Adam optimizer ($\text{lr} = 0.0002$, $\beta_1 = 0.5$, $\beta_2 = 0.999$, batch size = 128).
- **Duration**: 75 complete epochs with automated checkpointing.
- **Convergence Dynamics**:
  - DCGAN: Discriminator loss converged to $\approx 0.61$, Generator loss stabilized at $\approx 2.69$ after Epoch 30.
  - cGAN: Successfully learned movement-specific color palettes and brush stroke distributions.
  - CAN: Entropy maximization successfully prevented collapse into a single dominant movement while maintaining genuine art quality.

---

## 📂 Repository Structure

```
.
├── GAN-Artwork-Generation/       # PyTorch Model Implementations & Training
│   ├── dataloader.py             # Optimized PyTorch DataLoader
│   ├── parameters.py             # Training hyperparameters
│   ├── train.py                  # Standalone GPU training script with auto-checkpoints
│   ├── custom_dataset.py         # WikiArt dataset reader and transformations
│   ├── model.py                  # DCGAN Generator & Discriminator definitions
│   ├── model_cGAN.py             # Conditional GAN (Generator & Discriminator with class embeddings)
│   ├── model_CAN.py              # Creative Adversarial Network with ambiguity entropy
│   └── output/                   # Trained weights & epoch progression grids (Epoch 0 - 74)
│
├── web-ui/                       # Interactive Research & Evaluation Portal
│   ├── src/                      # React 19 + TypeScript + Vite application
│   │   ├── components/           # Comparator, Gallery scrubber, Loss charts, Model detail pages
│   │   └── data/                 # Benchmark metrics and model architecture specs
│   └── public/assets/            # Synchronized epoch sample outputs
│
├── generate_report_pdf.py        # Automated submission PDF generator
├── generate_presentation.py      # Automated assignment presentation generator (.pptx)
└── README.md                     # Project overview and documentation
```

---

## 🚀 Getting Started

### 1. Running the Interactive Web Portal
```bash
cd web-ui
npm install
npm run dev
```
Open `http://localhost:5173` to explore the model comparator, individual model breakdown pages, and epoch progression scrubber.

### 2. Training the PyTorch Models
```bash
cd GAN-Artwork-Generation
python train.py
```
Checkpoints and generated samples are saved continuously to `GAN-Artwork-Generation/output/`.

---

## ⚖️ Case Study & Ethical Considerations in Real-World GANs

1. **Copyright & Training Provenance**: Training on centuries of art history vs. contemporary living artists without attribution.
2. **Dataset Bias**: Historical art archives predominantly document European and Western styles; generative models mirror collection imbalances.
3. **Authenticity & Provenance**: Watermarking generative artworks to prevent provenance fraud in digital galleries and art markets.
4. **Environmental Footprint**: Computational energy usage during hyperparameter searches on large neural generative models.
