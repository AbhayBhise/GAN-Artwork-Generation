import os
import csv
from datasets import load_dataset
from PIL import Image

if __name__ == '__main__':
    print('Test streaming dataset...')
    ds = load_dataset('huggan/wikiart', split='train', streaming=True)
    features = ds.features
    if 'style' in features:
        style_feature = features['style']
        print('Style feature names:', style_feature.names)
    else:
        print('Style feature not found in', features)
