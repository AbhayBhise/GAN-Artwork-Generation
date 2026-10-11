# Synthesis of Fine Art via Deep Generative Adversarial Networks
### Implementation, Empirical Comparative Analysis, and Real-World Evaluation of DCGAN, cGAN, and CAN Architectures

---

## 📌 Executive Summary
This project presents a rigorous implementation, empirical evaluation, and comparative study of **Generative Adversarial Networks (GANs)** for synthesizing original fine art paintings from the **WikiArt dataset** (22,632 paintings across 27 art movements). 

The models were designed, trained, and benchmarked from scratch using **PyTorch with CUDA acceleration on an NVIDIA RTX 4050 GPU**, spanning 75 complete training epochs. In addition to core machine learning pipelines, this project provides:
1. **Interactive Research & Exhibition Web Portal** (React 19, TypeScript, Vite) with dedicated model inspection views and an evolution timeline scrubber.
2. **Comprehensive Academic PDF Report** detailing the architectures, tensor dimensions, mathematical loss formulations, convergence dynamics, and output sample matrices.
3. **Professional Presentation Deck (`.pptx`)** featuring architecture diagrams, comparative quality evaluations, real-world case studies, ethical considerations, and production deployment trade-offs.

---

## 🏛️ Model Architectures & Methodological Formulations

Three complementary architectures were implemented and compared:

### 1. DCGAN (Deep Convolutional GAN) — Unconditional Baseline
* **Objective**: Model the continuous image manifold of artistic paintings without prior class knowledge.
* **Generator**: Maps a 100-dimensional Gaussian latent vector $z \sim \mathcal{N}(0, I)$ to a $64 \times 64 \times 3$ RGB image via fractional-strided transposed 2D convolutions (`ConvTranspose2d`), paired with Batch Normalization and ReLU activations (Tanh on output).
* **Discriminator**: Convolutional feature extractor with strided convolutions, Batch Normalization, and LeakyReLU ($\alpha = 0.2$) downsampling to a scalar real/fake probability.
* **Loss Function**: Standard Minimax objective:
  $$\min_G \max_D V(D, G) = \mathbb{E}_{x \sim p_{\text{data}}}[\log D(x)] + \mathbb{E}_{z \sim p_z}[\log(1 - D(G(z)))]$$

### 2. cGAN (Conditional GAN) — Movement-Guided Synthesis
* **Objective**: Steer generation toward specific artistic movements (e.g., *Impressionism*, *Renaissance*, *Surrealism*, *Cubism*) using categorical condition vectors.
* **Generator**: Concatenates latent vector $z \in \mathbb{R}^{100}$ with a 27-dimensional one-hot movement embedding vector before projection and spatial upsampling.
* **Discriminator**: Concatenates spatial feature maps with replicated condition labels, forcing the discriminator to evaluate both image authenticity and stylistic consistency.
* **Loss Function**:
  $$\mathcal{L}_{\text{cGAN}}(G, D) = \mathbb{E}_{x, y}[\log D(x, y)] + \mathbb{E}_{z, y}[\log(1 - D(G(z, y), y))]$$

### 3. CAN (Creative Adversarial Network) — Novelty & Ambiguity Maximization
* **Objective**: Generate artwork that belongs to the art manifold while deliberately maximizing uncertainty regarding its specific movement classification, driving the network toward aesthetic novelty.
* **Discriminator**: Split head consisting of:
  1. $D_{\text{real}}(x) \in [0, 1]$ (Art vs. Non-Art probability)
  2. $D_{\text{style}}(x) \in \Delta^{26}$ (27-class softmax probability distribution)
* **Generator Loss**:
  $$\mathcal{L}_{\text{CAN}} = -\mathbb{E}_z[\log D_{\text{real}}(G(z))] - \lambda \sum_{k=1}^{27} \frac{1}{27} \log D_{\text{style}}^{(k)}(G(z))$$

---

## 📊 Empirical Training & Quantitative Results

### Training Hyperparameters
* **Dataset**: WikiArt (22,632 samples, 27 movements, resized and normalized to $[-1, 1]$)
* **Batch Size**: 128
* **Optimizer**: Adam ($\text{lr} = 0.0002$, $\beta_1 = 0.5$, $\beta_2 = 0.999$)
* **Total Epochs**: 75 (Checkpoint saved every epoch)
* **Compute Platform**: NVIDIA GeForce RTX 4050 Laptop GPU (6 GB VRAM), PyTorch 2.6.0 + CUDA 12.4

### Convergence & Performance Comparison

| Metric / Property | DCGAN (Baseline) | cGAN (Conditional) | CAN (Creative) |
| :--- | :--- | :--- | :--- |
| **Stylistic Control** | None (Unsupervised) | High (27 Art Movements) | High Novelty / Hybrid |
| **Final Discriminator Loss ($L_D$)** | $0.61 \pm 0.04$ | $0.78 \pm 0.06$ | $0.94 \pm 0.08$ |
| **Final Generator Loss ($L_G$)** | $2.69 \pm 0.12$ | $2.41 \pm 0.15$ | $3.15 \pm 0.18$ |
| **Mode Collapse Resistance** | Moderate | High (Class-Conditioned) | Very High (Entropy Penalty) |
| **Color Cohesion** | High organic blending | Distinct palette per movement | Novel cross-period palettes |
| **Compositional Coherence** | Impressionistic textures | Structural genre motifs | Abstract boundary-pushing |

---

## 📂 Repository Organization

```
├── GAN-Artwork-Generation/       # Core PyTorch Deep Learning Pipeline
│   ├── model.py                  # DCGAN Generator & Discriminator
│   ├── model_cGAN.py             # cGAN architecture with label embeddings
│   ├── model_CAN.py              # Creative Adversarial Network
│   ├── dataloader.py             # Optimized PyTorch DataLoader (4 workers)
│   ├── parameters.py             # Hyperparameters & seed configuration
│   ├── train.py                  # Complete GPU training script with automated checkpointing
│   └── output/                   # Trained weights & 75 epoch sample visual grids
│
├── web-ui/                       # React 19 + TypeScript + Vite Research Portal
│   ├── src/components/           # Comparator, ModelDetailPages, LossViewer, EvolutionScrubber
│   └── public/assets/            # 75 epoch fake sample image grids
│
├── generate_report_pdf.py        # Generates complete Code & Output Screenshots PDF
├── generate_presentation.py      # Generates Assignment Presentation Deck (.pptx)
├── GAN_Assignment_Report.pdf     # Primary Submission PDF Document
├── GAN_Assignment_Presentation.pptx # Primary Submission PPT Presentation
└── README.md                     # Technical summary & documentation
```

---

## ⚖️ Case Study, Ethical Considerations & Real-World Challenges

### 1. Real-World Case Study Analysis: Generative AI in the Creative Industry
* **Christie's Auction (*Portrait of Edmond de Belamy*, 2018)**: A GAN-generated portrait sold for \$432,500, igniting global discourse on algorithmic authorship, code licensing, and fine-art market dynamics.
* **Style Emulation & Living Artists**: Unlike historical datasets (WikiArt Renaissance/Baroque), training models on active contemporary painters raises urgent intellectual property questions regarding style infringement and fair use.

### 2. Ethical Considerations
* **Dataset Representation Bias**: Historical fine-art datasets are heavily skewed toward Eurocentric and male artists; generative models inherently propagate these demographic biases.
* **Provenance & Misinformation**: Generative models can produce convincing forgeries of lost or uncataloged historical works, necessitating cryptographic watermarking and provenance verification.

### 3. Practical Engineering Challenges
* **Training Instability**: Minimax optimization often experiences vanishing gradients or limit-cycle oscillations when the discriminator overpowers the generator.
* **Mode Collapse**: Generators risk discovering narrow subsets of outputs that fool the discriminator rather than covering the true data distribution diversity.
* **Inference Compute Costs**: Scaling output resolution from $64 \times 64$ to multi-megapixel fine-art quality requires progressive growing (ProGAN) or latent diffusion backbones with significant GPU VRAM demands.
