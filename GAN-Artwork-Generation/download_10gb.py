import os
from dotenv import load_dotenv

load_dotenv()
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
os.environ.setdefault("HF_HOME", os.path.join(PROJECT_DIR, ".hf_cache"))
os.environ.setdefault("HF_DATASETS_CACHE", os.path.join(PROJECT_DIR, ".hf_cache", "datasets"))

import io
from PIL import Image
from datasets import load_dataset

def main():
    out_dir = os.path.join(PROJECT_DIR, "data", "wikiart_10gb")
    os.makedirs(out_dir, exist_ok=True)
    
    # Each parquet file is ~500MB. To get 10GB, we need about 20 files.
    # We will just fetch the first 20 parquet files from huggingface.
    files_to_download = [f"data/train-{str(i).zfill(5)}-of-00072.parquet" for i in range(20)]
    
    token = os.getenv("HF_TOKEN")
    hf_cache = os.environ.get("HF_HOME", os.path.join(PROJECT_DIR, ".hf_cache"))
    print(f"HF cache directory (inside project): {hf_cache}", flush=True)
    print("Loading 10GB of dataset...", flush=True)
    # By specifying data_files, it will ONLY download these 20 files to cache
    dataset = load_dataset(
        "huggan/wikiart",
        data_files=files_to_download,
        split="train",
        token=token,
        cache_dir=hf_cache
    )
    
    print(f"Total images to process: {len(dataset)}", flush=True)
    
    # We want to extract them evenly per class if possible, but the parquet files might already be shuffled.
    # We'll just save them by class.
    for i, item in enumerate(dataset):
        try:
            image = item['image']
            # if image is bytes
            if isinstance(image, dict) and 'bytes' in image:
                image = Image.open(io.BytesIO(image['bytes']))
                
            label = item.get('style', 'unknown')
            if hasattr(label, 'name'):
                label_name = label.name
            else:
                label_name = str(label)
                
            class_dir = os.path.join(out_dir, label_name)
            os.makedirs(class_dir, exist_ok=True)
            
            image_path = os.path.join(class_dir, f"img_{i}.jpg")
            
            # Save if image has correct mode
            if image.mode != 'RGB':
                image = image.convert('RGB')
                
            image.save(image_path, "JPEG")
            
            if i > 0 and i % 1000 == 0:
                print(f"Saved {i} images so far...", flush=True)
                
        except Exception as e:
            print(f"Error on image {i}: {e}")
            continue

    print("Download and extraction complete!")

if __name__ == "__main__":
    main()
