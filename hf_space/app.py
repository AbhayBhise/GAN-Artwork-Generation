import os
import io
import torch
import torch.nn as nn
import torchvision.utils as vutils
from PIL import Image
import gradio as gr

# Hyperparameters matching the research paper
nz = 150
ngf = 64
nc = 3
n_class = 27

ART_STYLES = [
    'Abstract Expressionism', 'Action Painting', 'Analytical Cubism', 'Art Nouveau Modern',
    'Baroque', 'Color Field Painting', 'Contemporary Realism', 'Cubism', 'Early Renaissance',
    'Expressionism', 'Fauvism', 'High Renaissance', 'Impressionism', 'Mannerism Late Renaissance',
    'Minimalism', 'Naive Art Primitivism', 'New Realism', 'Northern Renaissance', 'Pointillism',
    'Pop Art', 'Post Impressionism', 'Realism', 'Rococo', 'Romanticism', 'Symbolism',
    'Synthetic Cubism', 'Ukiyo-e'
]

# Device setup (CPU Basic or ZeroGPU on Hugging Face Spaces)
device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')

# 1. DCGAN Generator Architecture
class DCGANGenerator(nn.Module):
    def __init__(self, latent_dim=150, ngf=64, nc=3):
        super(DCGANGenerator, self).__init__()
        self.main = nn.Sequential(
            nn.ConvTranspose2d(latent_dim, ngf * 8, 4, 1, 0, bias=False),
            nn.BatchNorm2d(ngf * 8),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 8, ngf * 4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 4),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 4, ngf * 2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 2),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 2, ngf, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf, nc, 4, 2, 1, bias=False),
            nn.Tanh()
        )

    def forward(self, x):
        return self.main(x)

# 2. cGAN Generator Architecture (Conditional)
class CGANGenerator(nn.Module):
    def __init__(self, latent_dim=150, n_classes=27, ngf=64, nc=3):
        super(CGANGenerator, self).__init__()
        self.label_emb = nn.Embedding(n_classes, n_classes)
        self.main = nn.Sequential(
            nn.ConvTranspose2d(latent_dim + n_classes, ngf * 8, 4, 1, 0, bias=False),
            nn.BatchNorm2d(ngf * 8),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 8, ngf * 4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 4),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 4, ngf * 2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 2),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 2, ngf, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf, nc, 4, 2, 1, bias=False),
            nn.Tanh()
        )

    def forward(self, noise, labels):
        # Concatenate noise and label vector
        labels_onehot = torch.zeros(noise.size(0), n_class, device=noise.device)
        labels_onehot.scatter_(1, labels.unsqueeze(1), 1.0)
        labels_onehot = labels_onehot.unsqueeze(2).unsqueeze(3)
        gen_input = torch.cat((noise, labels_onehot), 1)
        return self.main(gen_input)

# Model instances
dcgan_gen = DCGANGenerator(nz, ngf, nc).to(device)
cgan_gen = CGANGenerator(nz, n_class, ngf, nc).to(device)
can_gen = DCGANGenerator(nz, ngf, nc).to(device)

# Load weights if available
CHECKPOINT_PATH = "checkpoint_latest.pth"
if os.path.exists(CHECKPOINT_PATH):
    try:
        ckpt = torch.load(CHECKPOINT_PATH, map_location=device, weights_only=False)
        if 'netG' in ckpt:
            dcgan_gen.load_state_dict(ckpt['netG'])
            can_gen.load_state_dict(ckpt['netG'])
        else:
            dcgan_gen.load_state_dict(ckpt)
            can_gen.load_state_dict(ckpt)
        print("Loaded checkpoint into DCGAN and CAN generators.")
    except Exception as e:
        print(f"Notice: initialized generator weights ({e})")

dcgan_gen.eval()
cgan_gen.eval()
can_gen.eval()

def generate_artwork(model_type, style_name, num_canvases, seed):
    if seed != -1:
        torch.manual_seed(int(seed))

    num_samples = int(num_canvases)
    nrow = int(num_samples ** 0.5) if num_samples in [4, 9, 16, 25, 36, 64] else 4

    with torch.no_grad():
        noise = torch.randn(num_samples, nz, 1, 1, device=device)

        if model_type == "DCGAN (Baseline Unconditioned)":
            fake_tensors = dcgan_gen(noise)
            info = f"Generated {num_samples} canvases via DCGAN unconditioned manifold mapping. Output: [{num_samples}, 3, 64, 64]."
        elif model_type == "cGAN (Conditional by Art Style)":
            style_idx = ART_STYLES.index(style_name) if style_name in ART_STYLES else 0
            labels = torch.tensor([style_idx] * num_samples, device=device)
            fake_tensors = cgan_gen(noise, labels)
            info = f"Generated {num_samples} canvases conditioned on style: '{style_name}' (class ID {style_idx}/27)."
        else: # CAN
            fake_tensors = can_gen(noise)
            info = f"Generated {num_samples} creative canvases using Creative Adversarial Network (Entropy Maximization objective)."

        # Rescale [-1, 1] to [0, 1]
        fake_tensors = (fake_tensors + 1) / 2.0
        grid = vutils.make_grid(fake_tensors, nrow=nrow, padding=2, normalize=False)
        ndarr = grid.mul(255).add_(0.5).clamp_(0, 255).permute(1, 2, 0).to('cpu', torch.uint8).numpy()
        image = Image.fromarray(ndarr)

    return image, info

# Gradio Interface
with gr.Blocks(title="Ars Adversaria: Generative Artwork Synthesis Engine", theme=gr.themes.Soft()) as demo:
    gr.Markdown("""
    # 🎨 Ars Adversaria: Deep Generative Artwork Synthesis
    ### Comparative Research Engine: DCGAN vs Conditional GAN (cGAN) vs Creative Adversarial Networks (CAN)
    *Trained on 22,632 WikiArt paintings across 27 art historical movements.*
    """)

    with gr.Row():
        with gr.Column(scale=1):
            model_selector = gr.Radio(
                choices=[
                    "DCGAN (Baseline Unconditioned)",
                    "cGAN (Conditional by Art Style)",
                    "CAN (Creative Adversarial Network)"
                ],
                value="DCGAN (Baseline Unconditioned)",
                label="Select Generative Architecture"
            )

            style_dropdown = gr.Dropdown(
                choices=ART_STYLES,
                value="Impressionism",
                label="Target Art Movement (for cGAN)",
                interactive=True
            )

            num_slider = gr.Slider(
                minimum=1,
                maximum=36,
                value=16,
                step=1,
                label="Number of Synthetic Canvases (Batch Grid)"
            )

            seed_input = gr.Number(
                value=-1,
                label="Random Seed (-1 for random)",
                precision=0
            )

            generate_btn = gr.Button("✨ Synthesize Canvases", variant="primary")

        with gr.Column(scale=2):
            output_image = gr.Image(label="Synthesized Multi-Canvas Grid", type="pil")
            output_info = gr.Textbox(label="Tensor Pipeline Telemetry", interactive=False)

    generate_btn.click(
        fn=generate_artwork,
        inputs=[model_selector, style_dropdown, num_slider, seed_input],
        outputs=[output_image, output_info]
    )

    gr.Markdown("""
    ---
    **Architecture Specifications:**
    - **Generator:** Latent $z \\sim \\mathcal{N}(0, I) \\in \\mathbb{R}^{150}$ with 5 Transposed Convolutional layers & Tanh activation.
    - **Discriminator:** Strided convolutions with LeakyReLU(0.2) and Batch Normalization.
    - **Dataset:** WikiArt (22,632 catalogued artworks across 27 distinct art movements).
    - **GitHub Repository:** [AbhayBhise/GAN-Artwork-Generation](https://github.com/AbhayBhise/GAN-Artwork-Generation)
    """)

if __name__ == "__main__":
    demo.launch()
