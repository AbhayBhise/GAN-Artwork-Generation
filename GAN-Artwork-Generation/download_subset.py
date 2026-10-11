import os
import csv
from datasets import load_dataset

def prepare_subset():
    print("Loading dataset in streaming mode...")
    dataset = load_dataset('huggan/wikiart', split='train', streaming=True)
    features = dataset.features
    style_names_list = features['style'].names

    target_styles = {
        'Impressionism': 0,
        'Realism': 0,
        'Romanticism': 0,
        'Expressionism': 0,
        'Post_Impressionism': 0,
        'Baroque': 0,
        'Art_Nouveau': 0,
        'Ukiyo_e': 0
    }
    
    style_names = list(target_styles.keys())
    style_to_id = {name: idx for idx, name in enumerate(style_names)}
    
    images_per_style = 500
    
    out_dir = r"f:\PROJECTS\GAN\GAN-Artwork-Generation\data\wikiart_subset"
    os.makedirs(out_dir, exist_ok=True)
    
    # Count existing images to resume
    for style in style_names:
        style_dir = os.path.join(out_dir, style)
        os.makedirs(style_dir, exist_ok=True)
        existing = len([f for f in os.listdir(style_dir) if f.endswith('.jpg')])
        target_styles[style] = existing
        
    print(f"Resuming with stats: {target_styles}")
        
    metadata_path = os.path.join(out_dir, "metadata.csv")
    
    total_downloaded = sum(target_styles.values())
    
    # Append to existing csv or create new
    mode = 'a' if os.path.exists(metadata_path) else 'w'
    with open(metadata_path, mode, newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        if mode == 'w':
            writer.writerow(['filename', 'style_id', 'style_name'])
        
        for item in dataset:
            style_idx = item['style']
            style_name_in_ds = style_names_list[style_idx]
            
            if style_name_in_ds in target_styles:
                if target_styles[style_name_in_ds] < images_per_style:
                    # Save image
                    img = item['image']
                    
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                        
                    count = target_styles[style_name_in_ds]
                    filename = f"{style_name_in_ds}_{count:04d}.jpg"
                    img_path = os.path.join(out_dir, style_name_in_ds, filename)
                    
                    img.save(img_path)
                    writer.writerow([os.path.join(style_name_in_ds, filename), style_to_id[style_name_in_ds], style_name_in_ds])
                    
                    target_styles[style_name_in_ds] += 1
                    total_downloaded += 1
                    
                    if total_downloaded % 100 == 0:
                        print(f"Downloaded {total_downloaded} images... Current stats: {target_styles}")
                        
            if all(v >= images_per_style for v in target_styles.values()):
                print("Finished downloading required images!")
                break
                
    print(f"Total downloaded: {total_downloaded}")

if __name__ == '__main__':
    prepare_subset()
