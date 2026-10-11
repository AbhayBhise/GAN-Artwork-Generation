import os
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision.transforms as transforms
import torchvision.utils as vutils
from torch.utils.data import DataLoader
from datasets import load_dataset
from model import Generator, Discriminator, weights_init
from parameters import *

from dataloader import get_dataset

def train():
    device = torch.device("cuda:0" if (torch.cuda.is_available() and ngpu > 0) else "cpu")
    print(f"Using device: {device}")
    
    if device.type == 'cuda':
        torch.backends.cudnn.benchmark = True
        print(f"GPU Model: {torch.cuda.get_device_name(0)}")
        print("Enabled torch.backends.cudnn.benchmark = True for optimal convolution kernels.")
    
    print("Loading local dataset...")
    dataloader = get_dataset()
    print(f"Dataset ready. Batches per epoch: {len(dataloader)}")
    
    netG = Generator(ngpu).to(device)
    netG.apply(weights_init)
    
    netD = Discriminator(ngpu).to(device)
    netD.apply(weights_init)
    
    criterion = nn.BCELoss()
    fixed_noise = torch.randn(64, nz, 1, 1, device=device)
    
    real_label = 1.
    fake_label = 0.
    
    optimizerD = optim.Adam(netD.parameters(), lr=lr, betas=(beta1, 0.999))
    optimizerG = optim.Adam(netG.parameters(), lr=lr, betas=(beta1, 0.999))
    
    out_dir = "output"
    os.makedirs(out_dir, exist_ok=True)
    
    # Check for existing checkpoint to resume
    checkpoint_path = os.path.join(out_dir, 'checkpoint_latest.pth')
    start_epoch = 0
    if os.path.exists(checkpoint_path):
        print(f"Found existing checkpoint at {checkpoint_path}. Resuming...")
        checkpoint = torch.load(checkpoint_path, map_location=device)
        netG.load_state_dict(checkpoint['netG_state_dict'])
        netD.load_state_dict(checkpoint['netD_state_dict'])
        optimizerG.load_state_dict(checkpoint['optimizerG_state_dict'])
        optimizerD.load_state_dict(checkpoint['optimizerD_state_dict'])
        start_epoch = checkpoint['epoch'] + 1
        print(f"Resuming from epoch {start_epoch}/{num_epochs}")
    
    print("Starting Training Loop...")
    for epoch in range(start_epoch, num_epochs):
        for i, data in enumerate(dataloader, 0):
            netD.zero_grad()
            real_cpu = data[0].to(device, non_blocking=True)
            b_size = real_cpu.size(0)
            label = torch.full((b_size,), real_label, dtype=torch.float, device=device)
            
            output = netD(real_cpu).view(-1)
            errD_real = criterion(output, label)
            errD_real.backward()
            D_x = output.mean().item()
            
            noise = torch.randn(b_size, nz, 1, 1, device=device)
            fake = netG(noise)
            label.fill_(fake_label)
            
            output = netD(fake.detach()).view(-1)
            errD_fake = criterion(output, label)
            errD_fake.backward()
            D_G_z1 = output.mean().item()
            
            errD = errD_real + errD_fake
            optimizerD.step()
            
            netG.zero_grad()
            label.fill_(real_label)
            output = netD(fake).view(-1)
            errG = criterion(output, label)
            errG.backward()
            D_G_z2 = output.mean().item()
            optimizerG.step()
            
            if i % 10 == 0:
                print(f'[Epoch {epoch}/{num_epochs}][Batch {i}/{len(dataloader)}] Loss_D: {errD.item():.4f} Loss_G: {errG.item():.4f} D(x): {D_x:.4f} D(G(z)): {D_G_z1:.4f} / {D_G_z2:.4f}', flush=True)
        
        # End of epoch: save sample image and checkpoint
        with torch.no_grad():
            sample_fake = netG(fixed_noise).detach().cpu()
        vutils.save_image(sample_fake, os.path.join(out_dir, f'fake_samples_epoch_{epoch}.png'), normalize=True)
        
        torch.save({
            'epoch': epoch,
            'netG_state_dict': netG.state_dict(),
            'netD_state_dict': netD.state_dict(),
            'optimizerG_state_dict': optimizerG.state_dict(),
            'optimizerD_state_dict': optimizerD.state_dict(),
        }, checkpoint_path)
        print(f"--- [Epoch {epoch}/{num_epochs} Complete] Sample image and checkpoint saved. ---", flush=True)
    
    # Save final models
    torch.save(netG.state_dict(), os.path.join(out_dir, 'netG_trained.pth'))
    torch.save(netD.state_dict(), os.path.join(out_dir, 'netD_trained.pth'))
    
    with torch.no_grad():
        fake = netG(fixed_noise).detach().cpu()
    vutils.save_image(fake, os.path.join(out_dir, 'fake_samples_trained.png'), normalize=True)
    
    print("Training finished! Final models and samples saved.")
    
if __name__ == '__main__':
    train()
