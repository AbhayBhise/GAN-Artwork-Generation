import os
import io
import torch
import torchvision.utils as vutils
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse, FileResponse
from PIL import Image

# Import models
import sys
sys.path.append('f:/PROJECTS/GAN/GAN-Artwork-Generation')
from model import Generator

app = FastAPI(
    title="Ars Adversaria Generative AI Backend",
    description="Live PyTorch GAN Inference API for artwork synthesis on NVIDIA RTX 4050",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DEVICE = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
LATENT_DIM = 150
generator = None

def load_generator():
    global generator
    if generator is None:
        generator = Generator(LATENT_DIM).to(DEVICE)
        checkpoint_path = 'f:/PROJECTS/GAN/GAN-Artwork-Generation/output/checkpoint_latest.pth'
        if os.path.exists(checkpoint_path):
            checkpoint = torch.load(checkpoint_path, map_location=DEVICE, weights_only=False)
            if 'netG' in checkpoint:
                generator.load_state_dict(checkpoint['netG'])
            else:
                generator.load_state_dict(checkpoint)
            generator.eval()
            print("Loaded latest checkpoint successfully.")
        else:
            print("Warning: checkpoint not found, running with initialized weights.")
    return generator

@app.on_event("startup")
def startup_event():
    try:
        load_generator()
    except Exception as e:
        print(f"Failed to load generator at startup: {e}")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Ars Adversaria Generative Artwork Synthesis Engine",
        "device": str(DEVICE),
        "cuda_available": torch.cuda.is_available(),
        "gpu_name": torch.cuda.get_device_name(0) if torch.cuda.is_available() else "CPU",
        "endpoints": [
            "/generate (GET: generates live artwork canvas PNG)",
            "/telemetry (GET: live GPU memory and epoch statistics)",
            "/report (GET: downloads publication PDF report)"
        ]
    }

@app.get("/generate")
def generate_artwork(num_samples: int = Query(default=16, ge=1, le=64)):
    """Generate fresh synthetic artwork from Gaussian latent space z ~ N(0, I)."""
    try:
        gen = load_generator()
        with torch.no_grad():
            noise = torch.randn(num_samples, LATENT_DIM, 1, 1, device=DEVICE)
            fake_tensors = gen(noise)
            # Normalize from [-1, 1] to [0, 1]
            fake_tensors = (fake_tensors + 1) / 2.0
            grid = vutils.make_grid(fake_tensors, nrow=int(num_samples**0.5), padding=2, normalize=False)
            
            # Convert to PIL Image
            ndarr = grid.mul(255).add_(0.5).clamp_(0, 255).permute(1, 2, 0).to('cpu', torch.uint8).numpy()
            im = Image.fromarray(ndarr)
            
            buf = io.BytesIO()
            im.save(buf, format='PNG')
            buf.seek(0)
            return Response(content=buf.getvalue(), media_type="image/png")
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/telemetry")
def get_telemetry():
    """Retrieve live GPU hardware and memory metrics."""
    telemetry = {
        "device": str(DEVICE),
        "cuda": torch.cuda.is_available()
    }
    if torch.cuda.is_available():
        telemetry.update({
            "gpu_name": torch.cuda.get_device_name(0),
            "allocated_vram_mb": round(torch.cuda.memory_allocated(0) / (1024**2), 2),
            "reserved_vram_mb": round(torch.cuda.memory_reserved(0) / (1024**2), 2),
            "max_memory_mb": round(torch.cuda.get_device_properties(0).total_memory / (1024**2), 2)
        })
    return telemetry

@app.get("/report")
def get_pdf_report():
    pdf_path = 'f:/PROJECTS/GAN/Ars_Adversaria_Project_Report.pdf'
    if os.path.exists(pdf_path):
        return FileResponse(pdf_path, media_type="application/pdf", filename="Ars_Adversaria_Project_Report.pdf")
    return JSONResponse(status_code=404, content={"error": "Report PDF not found."})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
