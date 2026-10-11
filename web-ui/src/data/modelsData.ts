export interface ModelArchitecture {
  id: string
  name: string
  fullName: string
  paperRef: string
  paperUrl: string
  keyInnovation: string
  generatorInput: string
  generatorOutput: string
  discriminatorInput: string
  discriminatorOutput: string
  lossFunction: string
  lossFormula: string
  objective: string
  datasetUsed: string
  batchSize: number
  epochsTrained: number
  status: string
  tagColor: string
  accentColor: string
  description: string
  strengths: string[]
  limitations: string[]
  sampleImages: {
    title: string
    subtitle: string
    url: string
    badge: string
  }[]
  metrics: {
    lossD: string
    lossG: string
    epochConvergence: string
    trainingStability: string
  }
}

export const GAN_MODELS: ModelArchitecture[] = [
  {
    id: 'dcgan',
    name: 'DCGAN',
    fullName: 'Deep Convolutional Generative Adversarial Network',
    paperRef: 'Radford et al., 2015 (ICLR 2016)',
    paperUrl: 'https://arxiv.org/abs/1511.06434',
    keyInnovation: 'Spatial Strided Deconvolutions & Convolutions with Batch Normalization, replacing deterministic pooling and dense layers.',
    generatorInput: 'Latent Noise Vector z ~ N(0, I) ∈ R^150',
    generatorOutput: 'Synthetic RGB Artwork Image [3, 64, 64] with Tanh activation',
    discriminatorInput: 'RGB Image [3, 64, 64] (Real painting or Fake generator output)',
    discriminatorOutput: 'Scalar probability D(x) ∈ [0, 1] (Real vs Fake validity)',
    lossFunction: 'Binary Cross-Entropy Loss (BCE Loss)',
    lossFormula: 'min_G max_D V(D,G) = E_{x~p_data}[log D(x)] + E_{z~p_z}[log(1 - D(G(z)))]',
    objective: 'Learn the underlying manifold of art distributions and produce realistic artwork to fool the discriminator.',
    datasetUsed: 'WikiArt Dataset (22,632 paintings across 27 artistic styles)',
    batchSize: 128,
    epochsTrained: 35,
    status: 'Trained & Converged on GPU (RTX 4050)',
    tagColor: '#6366f1',
    accentColor: '#eef2ff',
    description: 'Our foundational baseline model. It replaces traditional fully-connected layers with deep convolutional and fractional-strided convolutional layers. Batch Normalization stabilizes training by normalizing inputs to zero mean and unit variance.',
    strengths: [
      'Stable baseline architecture with proven geometric feature extraction',
      'No class label dependency; generates broad variety across all painters',
      'Fast forward/backward passes on GPU (~0.05s pure compute per batch)'
    ],
    limitations: [
      'Lacks control over which specific art movement or genre is produced',
      'Can blend disparate historical styles into hybrid textures',
      'Generator loss can fluctuate as discriminator becomes proficient'
    ],
    sampleImages: [
      {
        title: 'Epoch 34 Generated Samples',
        subtitle: 'Latest GPU Training Run (100% convergence)',
        url: '/assets/fake_samples_epoch_34.png',
        badge: 'Live Run (Ep 34)'
      },
      {
        title: 'Epoch 30 Generated Samples',
        subtitle: 'Rich portraits and color compositions emerging',
        url: '/assets/fake_samples_epoch_30.png',
        badge: 'Epoch 30'
      },
      {
        title: 'Epoch 15 Generated Samples',
        subtitle: 'Midway progression: distinct palettes and shapes',
        url: '/assets/fake_samples_epoch_15.png',
        badge: 'Epoch 15'
      },
      {
        title: 'Epoch 0 (Initial Latent Noise)',
        subtitle: 'Untrained random weights initialization',
        url: '/assets/fake_samples_epoch_0.png',
        badge: 'Baseline Noise'
      },
      {
        title: 'Final Benchmark Grid (Paper Results)',
        subtitle: 'Full 150-epoch long-term run benchmark comparison',
        url: '/assets/results_dcgan.png',
        badge: 'Report Benchmark'
      }
    ],
    metrics: {
      lossD: '0.67 - 0.74 (Balanced)',
      lossG: '1.85 - 2.45 (Stable)',
      epochConvergence: '~25 Epochs',
      trainingStability: '94% (Zero Mode Collapse)'
    }
  },
  {
    id: 'cgan',
    name: 'Conditional GAN',
    fullName: 'Conditional Generative Adversarial Network (CGAN)',
    paperRef: 'Mirza & Osindero, 2014',
    paperUrl: 'https://arxiv.org/abs/1411.1784',
    keyInnovation: 'Style Conditioning Vector concatenation at Generator input and Flattened Discriminator feature maps with Gaussian noise input decay.',
    generatorInput: 'Concatenated vector [Noise z (150) + Style One-Hot y (27)] ∈ R^177',
    generatorOutput: 'Targeted style painting [3, 64, 64] matching requested class y',
    discriminatorInput: 'Image [3, 64, 64] paired with Style Label y',
    discriminatorOutput: 'Conditional probability D(x|y) of image matching style y and being authentic',
    lossFunction: 'Conditional Binary Cross-Entropy Loss',
    lossFormula: 'min_G max_D V(D,G) = E_{x,y}[log D(x|y)] + E_{z,y}[log(1 - D(G(z,y)|y))]',
    objective: 'Generate artwork strictly belonging to a requested user-chosen style (e.g., Impressionism, Cubism, Ukiyo-e, Baroque).',
    datasetUsed: 'WikiArt Dataset (27 style categories, 81,449 catalogued pieces)',
    batchSize: 128,
    epochsTrained: 50,
    status: 'Trained Model & Multi-Class Evaluation Ready',
    tagColor: '#0d9488',
    accentColor: '#ccfbf1',
    description: 'Enables deterministic control over artistic output. By feeding categorical style embeddings into both the generator and discriminator, the user can steer the generation process towards specific movements like Impressionism or Surrealism.',
    strengths: [
      'Direct controllable style generation across 27 distinct movements',
      'Gaussian noise injection prevented discriminator overpowering in early epochs',
      'Strong emulation of high-data genres like Impressionism and Rococo'
    ],
    limitations: [
      'Styles with sparse data (e.g., Analytical Cubism with 110 images) exhibit mode collapse',
      'Requires explicit annotated style labels during both training and inference'
    ],
    sampleImages: [
      {
        title: 'Complete 27-Style Comparison Grid',
        subtitle: 'Real WikiArt paintings vs CGAN Fake generated equivalents',
        url: '/assets/cgan_results.png',
        badge: '27 Styles Comparison'
      }
    ],
    metrics: {
      lossD: '0.45 - 0.65',
      lossG: '2.10 - 2.80',
      epochConvergence: '~30 Epochs',
      trainingStability: '89% (Dependent on Class Count)'
    }
  },
  {
    id: 'can',
    name: 'CAN (Creative GAN)',
    fullName: 'Creative Adversarial Network for Deviating Style Norms',
    paperRef: 'Elgammal et al., 2017 (Rutgers / Facebook AI)',
    paperUrl: 'https://arxiv.org/abs/1706.07068',
    keyInnovation: 'Dual-Head Discriminator with Cross-Entropy Style Ambiguity Maximization (Punishes Generator if Discriminator easily classifies the style).',
    generatorInput: 'Latent Noise Vector z ~ N(0, I) ∈ R^150',
    generatorOutput: 'Creative, style-ambiguous artwork [3, 64, 64]',
    discriminatorInput: 'Artwork Image [3, 64, 64]',
    discriminatorOutput: 'Dual outputs: (1) Real vs Fake D(x) ∈ [0, 1], (2) Style Distribution Dc(c|x) ∈ R^27',
    lossFunction: 'Adversarial BCE + Normalized Shannon Entropy Maximization on Style Distribution',
    lossFormula: 'L_G = log(D(G(z))) + Σ [1/K log(Dc(ck|G(z))) + (1 - 1/K) log(1 - Dc(ck|G(z)))]',
    objective: 'Generate innovative, creative artwork that looks like authentic human art but cannot be pigeonholed into any single existing art movement.',
    datasetUsed: 'WikiArt Dataset (27 styles used for style-deviating boundary push)',
    batchSize: 64,
    epochsTrained: 150,
    status: 'Trained & Style-Ambiguity Evaluated',
    tagColor: '#f59e0b',
    accentColor: '#fef3c7',
    description: 'Unlike traditional GANs that blindly mimic past examples, CAN acts as an artistic explorer. It is rewarded for generating art that the discriminator acknowledges as authentic paintings, yet is heavily penalized if the discriminator can classify it into a known historic style.',
    strengths: [
      'Creates groundbreaking, style-ambiguous aesthetic pieces',
      'Backed by psychological and computational theories of creativity (Martindale law)',
      'Human-evaluation studies rated CAN pieces higher than some contemporary human paintings'
    ],
    limitations: [
      'Balancing adversarial loss vs entropy loss requires careful tuning',
      'Entropy metric is subjective and oscillates during phase transitions'
    ],
    sampleImages: [
      {
        title: 'Creative Adversarial Generated Pieces',
        subtitle: 'Style-ambiguous masterpieces pushing beyond established movements',
        url: '/assets/CAN_examples.png',
        badge: 'Creative Art Pieces'
      }
    ],
    metrics: {
      lossD: '0.52 - 0.78',
      lossG: '2.80 - 4.10',
      epochConvergence: '~45 Epochs',
      trainingStability: 'Entropy > 0.5'
    }
  }
]

export const ART_STYLES_LIST = [
  'Abstract Expressionism', 'Action Painting', 'Analytical Cubism', 'Art Nouveau Modern',
  'Baroque', 'Color Field Painting', 'Contemporary Realism', 'Cubism', 'Early Renaissance',
  'Expressionism', 'Fauvism', 'High Renaissance', 'Impressionism', 'Mannerism Late Renaissance',
  'Minimalism', 'Naive Art Primitivism', 'New Realism', 'Northern Renaissance', 'Pointillism',
  'Pop Art', 'Post Impressionism', 'Realism', 'Rococo', 'Romanticism', 'Symbolism',
  'Synthetic Cubism', 'Ukiyo-e'
]
