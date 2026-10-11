import os
import csv
from datasets import load_dataset
from PIL import Image

def get_folder_size(folder):
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(folder):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            if not os.path.islink(fp):
                total_size += os.path.getsize(fp)
    return total_size

def download_20gb_equal_classes():
    print("Loading dataset in streaming mode...")
    dataset = load_dataset('huggan/wikiart', split='train', streaming=True)
    features = dataset.features
    style_names_list = features['style'].names
    
    out_dir = r"f:\PROJECTS\GAN\GAN-Artwork-Generation\data\wikiart_20gb"
    os.makedirs(out_dir, exist_ok=True)
    
    target_size_bytes = 20 * 1024 * 1024 * 1024  # 20 GB
    
    style_counts = {name: 0 for name in style_names_list}
    
    # Check existing counts and size
    current_size = get_folder_size(out_dir)
    print(f"Current folder size: {current_size / (1024**3):.2f} GB")
    
    for style in style_names_list:
        style_dir = os.path.join(out_dir, style)
        os.makedirs(style_dir, exist_ok=True)
        existing = len([f for f in os.listdir(style_dir) if f.endswith('.jpg')])
        style_counts[style] = existing
        
    print(f"Resuming with stats: {style_counts}")
    
    total_downloaded = sum(style_counts.values())
    
    metadata_path = os.path.join(out_dir, "metadata.csv")
    mode = 'a' if os.path.exists(metadata_path) else 'w'
    
    with open(metadata_path, mode, newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        if mode == 'w':
            writer.writerow(['filename', 'style_id', 'style_name'])
            
        for item in dataset:
            style_idx = item['style']
            style_name = style_names_list[style_idx]
            
            # To maintain equal samples, only accept if count is <= min_count
            min_count = min(style_counts.values())
            
            if style_counts[style_name] == min_count:
                img = item['image']
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                    
                count = style_counts[style_name]
                filename = f"{style_name}_{count:05d}.jpg"
                img_path = os.path.join(out_dir, style_name, filename)
                
                img.save(img_path)
                writer.writerow([os.path.join(style_name, filename), style_idx, style_name])
                
                style_counts[style_name] += 1
                total_downloaded += 1
                
                if total_downloaded % 100 == 0:
                    current_size = get_folder_size(out_dir)
                    print(f"Downloaded {total_downloaded} images... Size: {current_size / (1024**3):.4f} GB")
                    if current_size >= target_size_bytes:
                        print("Reached 20GB limit!")
                        break

if __name__ == '__main__':
    download_20gb_equal_classes()
