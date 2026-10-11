import os
import pandas as pd
from PIL import Image
from torch.utils.data import Dataset

class WikiArtSubset(Dataset):
    def __init__(self, csv_file, root_dir, transform=None):
        \"\"\"
        Args:
            csv_file (string): Path to the csv file with annotations.
            root_dir (string): Directory with all the images.
            transform (callable, optional): Optional transform to be applied
                on a sample.
        \"\"\"
        self.metadata = pd.read_csv(csv_file)
        self.root_dir = root_dir
        self.transform = transform

    def __len__(self):
        return len(self.metadata)

    def __getitem__(self, idx):
        if torch.is_tensor(idx):
            idx = idx.tolist()

        img_name = os.path.join(self.root_dir, self.metadata.iloc[idx, 0])
        image = Image.open(img_name).convert('RGB')
        
        style_id = self.metadata.iloc[idx, 1]

        if self.transform:
            image = self.transform(image)

        return image, style_id
