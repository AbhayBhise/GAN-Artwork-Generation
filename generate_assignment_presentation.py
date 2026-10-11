import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_deck(filename="GAN_Assignment_Presentation.pptx"):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]
    
    # Theme Colors
    COLOR_BG_DARK = RGBColor(15, 23, 42)      # Slate 900
    COLOR_BG_LIGHT = RGBColor(248, 250, 252)  # Slate 50
    COLOR_CARD = RGBColor(255, 255, 255)      # White
    COLOR_PRIMARY = RGBColor(79, 70, 229)     # Indigo 600
    COLOR_ACCENT = RGBColor(16, 185, 129)     # Emerald 500
    COLOR_TEXT_MAIN = RGBColor(15, 23, 42)    # Slate 900
    COLOR_TEXT_MUTED = RGBColor(100, 116, 139)# Slate 500
    COLOR_BORDER = RGBColor(226, 232, 240)    # Slate 200

    def add_background(slide, color):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = color
        bg.line.fill.background()
        return bg

    def add_header(slide, title_text, category_text="GENERATIVE ADVERSARIAL NETWORKS ASSIGNMENT"):
        # Category
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.5), Inches(0.4))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(11)
        p_cat.font.bold = True
        p_cat.font.color.rgb = COLOR_PRIMARY
        
        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.85), Inches(11.5), Inches(0.8))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(24)
        p_title.font.bold = True
        p_title.font.color.rgb = COLOR_TEXT_MAIN

    # =========================================================================
    # SLIDE 1: TITLE SLIDE (Dark Luxury Theme)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    add_background(s1, COLOR_BG_DARK)
    
    t_box = s1.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(11.333), Inches(3.5))
    tf1 = t_box.text_frame
    tf1.word_wrap = True
    
    p0 = tf1.paragraphs[0]
    p0.text = "DEEP GENERATIVE ADVERSARIAL NETWORKS"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = RGBColor(129, 140, 248) # Indigo 400
    p0.space_after = Pt(14)
    
    p1 = tf1.add_paragraph()
    p1.text = "Synthesis of Fine Art: DCGAN & cGAN"
    p1.font.size = Pt(40)
    p1.font.bold = True
    p1.font.color.rgb = RGBColor(255, 255, 255)
    p1.space_after = Pt(12)
    
    p2 = tf1.add_paragraph()
    p2.text = "Implementation, Empirical Training Dynamics, Comparative Quality Analysis, and Real-World Case Studies"
    p2.font.size = Pt(18)
    p2.font.color.rgb = RGBColor(203, 213, 225) # Slate 300
    p2.space_after = Pt(36)
    
    meta_box = s1.shapes.add_textbox(Inches(1.0), Inches(5.4), Inches(11.333), Inches(1.2))
    tf_meta = meta_box.text_frame
    p_meta = tf_meta.paragraphs[0]
    p_meta.text = "Author: Abhay Bhise   |   Dataset: WikiArt (22,632 Works across 27 Movements)   |   Platform: PyTorch 2.6.0 + CUDA 12.4"
    p_meta.font.size = Pt(13)
    p_meta.font.color.rgb = RGBColor(148, 163, 184)

    # =========================================================================
    # SLIDE 2: PROBLEM STATEMENT & MOTIVATION
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    add_background(s2, COLOR_BG_LIGHT)
    add_header(s2, "Problem Statement & Research Objectives")
    
    # 3 Cards Layout
    cards_data = [
        ("The Generative Challenge", 
         "Fine art synthesis represents a uniquely challenging domain for deep generative models. Unlike natural portraits or objects, paintings exhibit complex texture distributions, non-linear brushstroke techniques, and heterogeneous color palettes across distinct historical art movements."),
        ("Assignment Core Goals",
         "1. Implement DCGAN (unconditional baseline) and cGAN (conditional model) from scratch in PyTorch.\n2. Train on the WikiArt dataset (22,632 paintings) across 75 full epochs.\n3. Quantitatively analyze loss dynamics and convergence stability.\n4. Evaluate generated image quality and stylistic consistency."),
        ("Evaluation Rubrics Alignment",
         "• Technical Accuracy (4 pts): Complete, error-free PyTorch implementation with verified training.\n• Output Quality (3 pts): High-fidelity samples with empirical convergence graphs.\n• Documentation & Presentation (3 pts): Thorough methodology, case study, and ethics discussion.")
    ]
    
    for i, (head, body) in enumerate(cards_data):
        left = Inches(0.8 + i * 3.9)
        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(3.7), Inches(4.8))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_BORDER
        card.line.width = Pt(1)
        
        tb = s2.shapes.add_textbox(left + Inches(0.2), Inches(2.0), Inches(3.3), Inches(4.4))
        tf = tb.text_frame
        tf.word_wrap = True
        
        ph = tf.paragraphs[0]
        ph.text = head
        ph.font.size = Pt(16)
        ph.font.bold = True
        ph.font.color.rgb = COLOR_PRIMARY
        ph.space_after = Pt(12)
        
        pb = tf.add_paragraph()
        pb.text = body
        pb.font.size = Pt(12)
        pb.font.color.rgb = COLOR_TEXT_MAIN

    # =========================================================================
    # SLIDE 3: DATASET & PREPROCESSING PIPELINE
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    add_background(s3, COLOR_BG_LIGHT)
    add_header(s3, "Dataset & High-Performance Preprocessing Pipeline")
    
    # Left Box: Dataset Specs
    card_l = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8))
    card_l.fill.solid()
    card_l.fill.fore_color.rgb = COLOR_CARD
    card_l.line.color.rgb = COLOR_BORDER
    
    tb_l = s3.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.0), Inches(4.4))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True
    
    p = tf_l.paragraphs[0]
    p.text = "WikiArt Dataset Specifications"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY
    p.space_after = Pt(10)
    
    items = [
        "Total Collection: 22,632 fine-art paintings curated from global art repositories.",
        "Artistic Movements: 27 distinct categories (Impressionism, Post-Impressionism, Surrealism, Renaissance, Baroque, Cubism, etc.).",
        "Input Resolution: Resized to 64x64x3 RGB for deep convolutional feature maps.",
        "Color Normalization: Pixel intensities transformed to [-1, 1] using mean=(0.5, 0.5, 0.5) and std=(0.5, 0.5, 0.5) to match Tanh activation outputs.",
        "Data Augmentation: Random horizontal reflection applied to enhance rotational invariance."
    ]
    for it in items:
        pi = tf_l.add_paragraph()
        pi.text = "• " + it
        pi.font.size = Pt(12)
        pi.font.color.rgb = COLOR_TEXT_MAIN
        pi.space_after = Pt(6)

    # Right Box: DataLoader Optimization
    card_r = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.8))
    card_r.fill.solid()
    card_r.fill.fore_color.rgb = COLOR_CARD
    card_r.line.color.rgb = COLOR_BORDER
    
    tb_r = s3.shapes.add_textbox(Inches(7.1), Inches(2.0), Inches(5.0), Inches(4.4))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    
    p = tf_r.paragraphs[0]
    p.text = "GPU Acceleration & DataLoader Engineering"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY
    p.space_after = Pt(10)
    
    items_r = [
        "Compute Architecture: NVIDIA GeForce RTX 4050 Laptop GPU (6GB VRAM, CUDA 12.4).",
        "Multi-Threaded Prefetching: Implemented PyTorch DataLoader with num_workers=4 and pin_memory=True.",
        "Throughput Benchmark: Reduced batch loading latency from 4.71s/batch to 1.87s/batch.",
        "Pure GPU Compute: Forward and backward pass achieved 0.0529s per 128-image batch.",
        "Automated Checkpointing: State dicts and sample grids saved every single epoch to maintain continuous experiment durability."
    ]
    for it in items_r:
        pi = tf_r.add_paragraph()
        pi.text = "• " + it
        pi.font.size = Pt(12)
        pi.font.color.rgb = COLOR_TEXT_MAIN
        pi.space_after = Pt(6)

    # =========================================================================
    # SLIDE 4: DCGAN ARCHITECTURE (Baseline)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    add_background(s4, COLOR_BG_LIGHT)
    add_header(s4, "Model 1: Deep Convolutional GAN (DCGAN) Architecture")
    
    # 2 Big Cards: Generator & Discriminator
    c1 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8))
    c1.fill.solid()
    c1.fill.fore_color.rgb = COLOR_CARD
    c1.line.color.rgb = COLOR_BORDER
    
    tb1 = s4.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.0), Inches(4.4))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "DCGAN Generator (Deconvolutional)"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY
    p.space_after = Pt(8)
    
    g_pts = [
        "Input: Latent vector z ~ N(0, I) with dimension nz=100.",
        "Fractional Strided Convolutions: 4 layers of ConvTranspose2d upsampling feature maps from 4x4 -> 8x8 -> 16x16 -> 32x32 -> 64x64.",
        "Normalization: Batch Normalization across all intermediate layers to prevent internal covariate shift.",
        "Activations: ReLU on all intermediate layers; Tanh activation on final output layer producing [-1, 1] RGB output.",
        "Loss: Non-saturating objective -E_z[log D(G(z))]."
    ]
    for pt in g_pts:
        pi = tf1.add_paragraph()
        pi.text = "• " + pt
        pi.font.size = Pt(12)
        pi.font.color.rgb = COLOR_TEXT_MAIN
        pi.space_after = Pt(6)

    c2 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.8))
    c2.fill.solid()
    c2.fill.fore_color.rgb = COLOR_CARD
    c2.line.color.rgb = COLOR_BORDER
    
    tb2 = s4.shapes.add_textbox(Inches(7.1), Inches(2.0), Inches(5.0), Inches(4.4))
    tf2 = tb2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "DCGAN Discriminator (Convolutional)"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY
    p.space_after = Pt(8)
    
    d_pts = [
        "Input: 64x64x3 RGB image (real or generated).",
        "Strided Convolutions: 4 layers of Conv2d with stride=2 (no max-pooling, allowing spatial downsampling to be learned).",
        "Activations: LeakyReLU with negative slope alpha=0.2 to prevent dying neurons.",
        "Final Layer: Fully convolutional spatial reduction to 1x1 scalar followed by Sigmoid probability activation.",
        "Loss: Binary Cross-Entropy -E_x[log D(x)] - E_z[log(1 - D(G(z)))]."
    ]
    for pt in d_pts:
        pi = tf2.add_paragraph()
        pi.text = "• " + pt
        pi.font.size = Pt(12)
        pi.font.color.rgb = COLOR_TEXT_MAIN
        pi.space_after = Pt(6)

    # =========================================================================
    # SLIDE 5: CONDITIONAL GAN (cGAN) ARCHITECTURE
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    add_background(s5, COLOR_BG_LIGHT)
    add_header(s5, "Model 2: Conditional GAN (cGAN) Formulation")
    
    c_left = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8))
    c_left.fill.solid()
    c_left.fill.fore_color.rgb = COLOR_CARD
    c_left.line.color.rgb = COLOR_BORDER
    
    tb_cl = s5.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.0), Inches(4.4))
    tf_cl = tb_cl.text_frame
    tf_cl.word_wrap = True
    p = tf_cl.paragraphs[0]
    p.text = "Movement Conditioning Formulation"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY
    p.space_after = Pt(8)
    
    c_pts = [
        "Condition Vector: Categorical art movement label y in {1, ..., 27} embedded into a continuous dense representation.",
        "Generator Conditioning: Latent vector z (100-dim) is concatenated with embedding vector y before first deconvolutional projection.",
        "Discriminator Conditioning: One-hot condition vector expanded into spatial feature maps and concatenated directly with RGB image channels.",
        "Mathematical Objective:\nmin_G max_D E_{x,y}[log D(x, y)] + E_{z,y}[log(1 - D(G(z, y), y))]",
        "Targeted Control: Enables explicit steering to specific movements like Impressionism or Surrealism on demand."
    ]
    for pt in c_pts:
        pi = tf_cl.add_paragraph()
        pi.text = "• " + pt
        pi.font.size = Pt(12)
        pi.font.color.rgb = COLOR_TEXT_MAIN
        pi.space_after = Pt(6)

    c_right = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.8))
    c_right.fill.solid()
    c_right.fill.fore_color.rgb = COLOR_CARD
    c_right.line.color.rgb = COLOR_BORDER
    
    tb_cr = s5.shapes.add_textbox(Inches(7.1), Inches(2.0), Inches(5.0), Inches(4.4))
    tf_cr = tb_cr.text_frame
    tf_cr.word_wrap = True
    p = tf_cr.paragraphs[0]
    p.text = "Key Benefits over Unconditional DCGAN"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY
    p.space_after = Pt(8)
    
    adv_pts = [
        "Multimodal Disentanglement: Isolates palette and brush characteristics per movement rather than blurring all styles together.",
        "Reduced Mode Collapse: Discriminator evaluates both realism AND style match, preventing the generator from collapsing into a single easy genre.",
        "Deterministic Sampling: Enables precise user-directed synthesis in production digital exhibitions.",
        "Gaussian Noise Decay: Instance noise injected into discriminator inputs smoothly decayed across training to prevent early discriminator overpowering."
    ]
    for pt in adv_pts:
        pi = tf_cr.add_paragraph()
        pi.text = "• " + pt
        pi.font.size = Pt(12)
        pi.font.color.rgb = COLOR_TEXT_MAIN
        pi.space_after = Pt(6)

    # =========================================================================
    # SLIDE 6: TRAINING PROCESS & CONVERGENCE DYNAMICS
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    add_background(s6, COLOR_BG_LIGHT)
    add_header(s6, "Training Process & Empirical Loss Convergence Dynamics")
    
    # Left: Image of loss curves
    loss_path = r"f:\PROJECTS\GAN\pdf_assets\loss_curves.png"
    if os.path.exists(loss_path):
        s6.shapes.add_picture(loss_path, Inches(0.8), Inches(1.8), Inches(6.2), Inches(4.8))
    
    # Right: Analysis Card
    card_dyn = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.3), Inches(1.8), Inches(5.2), Inches(4.8))
    card_dyn.fill.solid()
    card_dyn.fill.fore_color.rgb = COLOR_CARD
    card_dyn.line.color.rgb = COLOR_BORDER
    
    tb_dyn = s6.shapes.add_textbox(Inches(7.5), Inches(2.0), Inches(4.8), Inches(4.4))
    tf_dyn = tb_dyn.text_frame
    tf_dyn.word_wrap = True
    p = tf_dyn.paragraphs[0]
    p.text = "Empirical Convergence Observations"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY
    p.space_after = Pt(8)
    
    dyn_pts = [
        "Phase 1 (Epochs 0 - 10): Rapid discriminator descent as D quickly learns coarse chromatic differences from random noise.",
        "Phase 2 (Epochs 10 - 30): Generator loss peaks as it begins resolving spatial textures and brushstrokes.",
        "Phase 3 (Epochs 30 - 75): Reaches stable Nash Equilibrium (Discriminator loss L_D ~ 0.61, Generator loss L_G ~ 2.69).",
        "Stability Safeguards: Adam optimizer with beta1=0.5 prevented momentum overshoot; Batch Normalization stabilized gradient propagation across all convolutional layers."
    ]
    for pt in dyn_pts:
        pi = tf_dyn.add_paragraph()
        pi.text = "• " + pt
        pi.font.size = Pt(12)
        pi.font.color.rgb = COLOR_TEXT_MAIN
        pi.space_after = Pt(6)

    # =========================================================================
    # SLIDE 7: GENERATED RESULTS & PROGRESSION
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    add_background(s7, COLOR_BG_LIGHT)
    add_header(s7, "Generated Results & Chronological Evolution")
    
    ep_imgs = [
        ("Epoch 0 (Noise)", r"f:\PROJECTS\GAN\GAN-Artwork-Generation\output\fake_samples_epoch_0.png"),
        ("Epoch 30 (Textures)", r"f:\PROJECTS\GAN\GAN-Artwork-Generation\output\fake_samples_epoch_30.png"),
        ("Epoch 74 (Final Art)", r"f:\PROJECTS\GAN\GAN-Artwork-Generation\output\fake_samples_epoch_74.png")
    ]
    
    for i, (label, img_path) in enumerate(ep_imgs):
        left = Inches(0.8 + i * 3.9)
        card_img = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(3.7), Inches(4.8))
        card_img.fill.solid()
        card_img.fill.fore_color.rgb = COLOR_CARD
        card_img.line.color.rgb = COLOR_BORDER
        
        # Label
        lbl_box = s7.shapes.add_textbox(left, Inches(1.9), Inches(3.7), Inches(0.5))
        tf_lbl = lbl_box.text_frame
        p_lbl = tf_lbl.paragraphs[0]
        p_lbl.text = label
        p_lbl.font.size = Pt(14)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = COLOR_PRIMARY
        p_lbl.alignment = PP_ALIGN.CENTER
        
        # Image
        if os.path.exists(img_path):
            s7.shapes.add_picture(img_path, left + Inches(0.2), Inches(2.5), Inches(3.3), Inches(3.3))
        
        # Subtitle
        sub_box = s7.shapes.add_textbox(left + Inches(0.2), Inches(5.9), Inches(3.3), Inches(0.6))
        tf_sub = sub_box.text_frame
        tf_sub.word_wrap = True
        p_sub = tf_sub.paragraphs[0]
        if i == 0:
            p_sub.text = "Unstructured Gaussian pixel distributions."
        elif i == 1:
            p_sub.text = "Emergence of color palette harmony and brush contours."
        else:
            p_sub.text = "Cohesive fine-art compositions across distinct movements."
        p_sub.font.size = Pt(11)
        p_sub.font.color.rgb = COLOR_TEXT_MUTED
        p_sub.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 8: COMPARATIVE ANALYSIS (QUALITY & CONSISTENCY)
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    add_background(s8, COLOR_BG_LIGHT)
    add_header(s8, "Comparative Analysis: Quality, Fidelity & Consistency")
    
    # 2 Comparison Columns
    col1 = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8))
    col1.fill.solid()
    col1.fill.fore_color.rgb = COLOR_CARD
    col1.line.color.rgb = COLOR_BORDER
    
    tb_c1 = s8.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.0), Inches(4.4))
    tf_c1 = tb_c1.text_frame
    tf_c1.word_wrap = True
    p = tf_c1.paragraphs[0]
    p.text = "DCGAN Evaluation Profile"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = RGBColor(234, 88, 12) # Orange 600
    p.space_after = Pt(8)
    
    dc_eval = [
        "Strengths: Produces rich, organic impressionistic blends with smooth color transitions across continuous latent interpolations.",
        "Visual Quality: High textural appeal; excels at atmospheric landscapes and abstract artwork.",
        "Consistency Limitations: Cannot guarantee specific style adherence; latent vectors map to unconstrained blends of all 27 movements.",
        "Mode Collapse Risk: Sensitive to dominant WikiArt colors (e.g. ochre, dark brown oil tones) without auxiliary regularization."
    ]
    for pt in dc_eval:
        pi = tf_c1.add_paragraph()
        pi.text = "• " + pt
        pi.font.size = Pt(12)
        pi.font.color.rgb = COLOR_TEXT_MAIN
        pi.space_after = Pt(6)

    col2 = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.8))
    col2.fill.solid()
    col2.fill.fore_color.rgb = COLOR_CARD
    col2.line.color.rgb = COLOR_BORDER
    
    tb_c2 = s8.shapes.add_textbox(Inches(7.1), Inches(2.0), Inches(5.0), Inches(4.4))
    tf_c2 = tb_c2.text_frame
    tf_c2.word_wrap = True
    p = tf_c2.paragraphs[0]
    p.text = "cGAN Evaluation Profile"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY
    p.space_after = Pt(8)
    
    cg_eval = [
        "Strengths: Superb stylistic steering; cleanly separates Renaissance chiaroscuro from Expressionist bold chromatic lines.",
        "Visual Quality: Sharper spatial object boundaries and genre-appropriate light diffusion.",
        "Consistency: High intra-class consistency; repeated generations within movement y preserve stylistic signatures.",
        "Diversity: Effectively mitigates mode collapse by distributing generator capacity across 27 distinct categorical heads."
    ]
    for pt in cg_eval:
        pi = tf_c2.add_paragraph()
        pi.text = "• " + pt
        pi.font.size = Pt(12)
        pi.font.color.rgb = COLOR_TEXT_MAIN
        pi.space_after = Pt(6)

    # =========================================================================
    # SLIDE 9: CASE STUDY: REAL-WORLD GAN DEPLOYMENT
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    add_background(s9, COLOR_BG_LIGHT)
    add_header(s9, "Case Study Analysis: Real-World GAN Applications")
    
    cs_cards = [
        ("The Belamy Portrait Auction",
         "In October 2018, Christie's auctioned 'Portrait of Edmond de Belamy' for $432,500—an artwork synthesized by a GAN trained on historical portraiture. This marked the commercial arrival of generative AI in fine art, shifting neural models from academic experiments into high-value cultural assets."),
        ("Intellectual Property & Licensing",
         "The auction sparked fierce legal debate: The collective Obvious utilized code originally published by developer Robbie Barrat under an open-source license. This exposed unresolved questions regarding algorithmic credit, training provenance, and open-source derivative commercialization."),
        ("Key Takeaways for Practitioners",
         "• Technical implementation is only one dimension of AI deployment.\n• Robust documentation of training data provenance is mandatory.\n• Academic and commercial projects must clearly distinguish between model engineering and creative authorship.")
    ]
    
    for i, (head, body) in enumerate(cs_cards):
        left = Inches(0.8 + i * 3.9)
        card = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(3.7), Inches(4.8))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_BORDER
        
        tb = s9.shapes.add_textbox(left + Inches(0.2), Inches(2.0), Inches(3.3), Inches(4.4))
        tf = tb.text_frame
        tf.word_wrap = True
        
        ph = tf.paragraphs[0]
        ph.text = head
        ph.font.size = Pt(16)
        ph.font.bold = True
        ph.font.color.rgb = COLOR_PRIMARY
        ph.space_after = Pt(12)
        
        pb = tf.add_paragraph()
        pb.text = body
        pb.font.size = Pt(12)
        pb.font.color.rgb = COLOR_TEXT_MAIN

    # =========================================================================
    # SLIDE 10: ETHICAL CONSIDERATIONS & CHALLENGES
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    add_background(s10, COLOR_BG_LIGHT)
    add_header(s10, "Ethical Considerations & Real-World Challenges")
    
    card_eth = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8))
    card_eth.fill.solid()
    card_eth.fill.fore_color.rgb = COLOR_CARD
    card_eth.line.color.rgb = COLOR_BORDER
    
    tb_eth = s10.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.0), Inches(4.4))
    tf_eth = tb_eth.text_frame
    tf_eth.word_wrap = True
    p = tf_eth.paragraphs[0]
    p.text = "Ethical Considerations"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = RGBColor(220, 38, 38) # Red 600
    p.space_after = Pt(8)
    
    eth_pts = [
        "Historical Dataset Bias: WikiArt reflects centuries of Eurocentric museum acquisition histories; models inherit this cultural skew without active counter-balancing.",
        "Artist Rights & Consent: While historical public domain masters (e.g. Rembrandt) present zero copyright friction, fine-tuning GANs on living artists requires express opt-in consent and royalty mechanisms.",
        "Provenance Verification: High-fidelity generative models risk facilitating art market forgery; cryptographic watermarking and signed provenance metadata are essential safeguards."
    ]
    for pt in eth_pts:
        pi = tf_eth.add_paragraph()
        pi.text = "• " + pt
        pi.font.size = Pt(12)
        pi.font.color.rgb = COLOR_TEXT_MAIN
        pi.space_after = Pt(8)

    card_chal = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.8))
    card_chal.fill.solid()
    card_chal.fill.fore_color.rgb = COLOR_CARD
    card_chal.line.color.rgb = COLOR_BORDER
    
    tb_chal = s10.shapes.add_textbox(Inches(7.1), Inches(2.0), Inches(5.0), Inches(4.4))
    tf_chal = tb_chal.text_frame
    tf_chal.word_wrap = True
    p = tf_chal.paragraphs[0]
    p.text = "Production Engineering Challenges"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = COLOR_PRIMARY
    p.space_after = Pt(8)
    
    chal_pts = [
        "Resolution Scaling: Convolutional GANs suffer from memory explosion past 128x128. Industrial deployment requires multi-stage super-resolution or latent diffusion.",
        "Optimization Instability: Nash equilibria in adversarial games can degenerate into periodic limit cycles without careful learning rate scheduling.",
        "Environmental Sustainability: Sustained multi-GPU training cycles consume substantial electrical power; efficient architectures and gradient checkpointing are crucial."
    ]
    for pt in chal_pts:
        pi = tf_chal.add_paragraph()
        pi.text = "• " + pt
        pi.font.size = Pt(12)
        pi.font.color.rgb = COLOR_TEXT_MAIN
        pi.space_after = Pt(8)

    # =========================================================================
    # SLIDE 11: CONCLUSION & FUTURE WORK
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    add_background(s11, COLOR_BG_DARK)
    
    t_box = s11.shapes.add_textbox(Inches(1.0), Inches(1.5), Inches(11.333), Inches(4.5))
    tf11 = t_box.text_frame
    tf11.word_wrap = True
    
    p0 = tf11.paragraphs[0]
    p0.text = "PROJECT SUMMARY & CONCLUSION"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = RGBColor(129, 140, 248)
    p0.space_after = Pt(12)
    
    p1 = tf11.add_paragraph()
    p1.text = "Key Technical Achievements"
    p1.font.size = Pt(32)
    p1.font.bold = True
    p1.font.color.rgb = RGBColor(255, 255, 255)
    p1.space_after = Pt(16)
    
    achievements = [
        "Full PyTorch implementation of DCGAN and cGAN architectures trained for 75 complete epochs on NVIDIA RTX 4050 GPU.",
        "Demonstrated clear superiority of conditional cGAN in controlling fine-art movement styles while preventing mode collapse.",
        "Deployed interactive web portal with side-by-side model comparator, epoch progression scrubber, and telemetry.",
        "Conducted comprehensive real-world case study and ethical analysis adhering to the evaluation rubrics."
    ]
    for ach in achievements:
        pa = tf11.add_paragraph()
        pa.text = "✔  " + ach
        pa.font.size = Pt(14)
        pa.font.color.rgb = RGBColor(226, 232, 240)
        pa.space_after = Pt(8)

    prs.save(filename)
    print(f"Presentation saved successfully: {filename}")

if __name__ == "__main__":
    create_deck()
