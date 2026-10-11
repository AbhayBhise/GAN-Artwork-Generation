import React, { useState, useEffect } from 'react'
import { ART_STYLES_LIST } from '../data/modelsData'
import { Play, Pause, RotateCcw, ZoomIn, Eye, Sparkles, Layers } from 'lucide-react'

interface InteractiveGalleryProps {
  onSelectImage: (src: string, title: string, subtitle: string, badge: string, modelName: string) => void
}

const EPOCH_SLIDES = [
  {
    epoch: 0,
    url: '/assets/fake_samples_epoch_0.png',
    title: 'Epoch 0: Random Latent Weight State',
    desc: 'Unconditioned random initialization. The generator produces unstructured high-frequency Gaussian noise with no spatial or chromatic semantics.',
    d_loss: '1.45',
    g_loss: '0.95'
  },
  {
    epoch: 5,
    url: '/assets/fake_samples_epoch_5.png',
    title: 'Epoch 5: Chromatic Coherence & Macro Palettes',
    desc: 'Global color distributions emerge. Deconvolutions begin learning primary canvas pigments (earthy browns, sky blues, skin tones) without distinct edges.',
    d_loss: '1.05',
    g_loss: '1.84'
  },
  {
    epoch: 15,
    url: '/assets/fake_samples_epoch_15.png',
    title: 'Epoch 15: Spatial Geometry & Brushwork',
    desc: 'Intermediate feature representations stabilize. Distinct compositional structures form: horizons, figures, and architectural motifs.',
    d_loss: '0.74',
    g_loss: '2.52'
  },
  {
    epoch: 25,
    url: '/assets/fake_samples_epoch_25.png',
    title: 'Epoch 25: Portraiture & Textural Refinement',
    desc: 'Fine-grained painterly strokes, tonal gradients, and recognizable artistic genres (Baroque chiaroscuro, Impressionist dabs) crystallize.',
    d_loss: '0.66',
    g_loss: '2.58'
  },
  {
    epoch: 30,
    url: '/assets/fake_samples_epoch_30.png',
    title: 'Epoch 30: High-Fidelity Manifold Mapping',
    desc: 'Generator captures diverse artistic textures, from Renaissance oil glaze to Post-Impressionist dynamic impasto without mode collapse.',
    d_loss: '0.63',
    g_loss: '2.71'
  },
  {
    epoch: 34,
    url: '/assets/fake_samples_epoch_34.png',
    title: 'Epoch 34: Optimal Nash Equilibrium',
    desc: 'Stable generator outputs with realistic contrast, depth, and brushwork convincing enough to challenge human discriminators.',
    d_loss: '0.61',
    g_loss: '2.69'
  },
  {
    epoch: 35,
    url: '/assets/fake_samples_epoch_35.png',
    title: 'Epoch 35: Live GPU Converged Synthesis',
    desc: 'Latest checkpoint generated directly by our NVIDIA RTX 4050 GPU session. Peak aesthetic diversity across 64 parallel synthetic canvases.',
    d_loss: '0.59',
    g_loss: '2.75'
  }
]

export const InteractiveGallery: React.FC<InteractiveGalleryProps> = ({ onSelectImage }) => {
  const [currentEpochIdx, setCurrentEpochIdx] = useState(6)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState<'evolution' | 'cgan' | 'can'>('evolution')

  // Auto-play evolution animation
  useEffect(() => {
    let interval: any
    if (isPlaying && activeTab === 'evolution') {
      interval = setInterval(() => {
        setCurrentEpochIdx((prev) => (prev + 1) % EPOCH_SLIDES.length)
      }, 1800)
    }
    return () => clearInterval(interval)
  }, [isPlaying, activeTab])

  const activeSlide = EPOCH_SLIDES[currentEpochIdx]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => { setActiveTab('evolution'); setIsPlaying(false); }}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: activeTab === 'evolution' ? '#eef2ff' : '#f8fafc',
              color: activeTab === 'evolution' ? '#4f46e5' : '#475569',
              border: activeTab === 'evolution' ? '1px solid #c7d2fe' : '1px solid #e2e8f0'
            }}
          >
            <Sparkles size={16} />
            DCGAN: Epoch Evolution (Interactive Scrub)
          </button>
          <button
            onClick={() => { setActiveTab('cgan'); setIsPlaying(false); }}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: activeTab === 'cgan' ? '#ccfbf1' : '#f8fafc',
              color: activeTab === 'cgan' ? '#0d9488' : '#475569',
              border: activeTab === 'cgan' ? '1px solid #99f6e4' : '1px solid #e2e8f0'
            }}
          >
            <Layers size={16} />
            cGAN: 27 Controlled Art Styles
          </button>
          <button
            onClick={() => { setActiveTab('can'); setIsPlaying(false); }}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: activeTab === 'can' ? '#fef3c7' : '#f8fafc',
              color: activeTab === 'can' ? '#d97706' : '#475569',
              border: activeTab === 'can' ? '1px solid #fde68a' : '1px solid #e2e8f0'
            }}
          >
            <Eye size={16} />
            CAN: Creative Style-Ambiguous Masterpieces
          </button>
        </div>
      </div>

      {/* Tab 1: DCGAN Epoch Evolution Slider */}
      {activeTab === 'evolution' && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
          }}
        >
          {/* Main Visual Display & Info */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '0px'
            }}
          >
            {/* Left Image Viewport */}
            <div
              style={{
                backgroundColor: '#0a0f1d',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '520px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                onClick={() =>
                  onSelectImage(
                    activeSlide.url,
                    activeSlide.title,
                    activeSlide.desc,
                    `Epoch ${activeSlide.epoch}`,
                    'DCGAN'
                  )
                }
              >
                <img
                  src={activeSlide.url}
                  alt={activeSlide.title}
                  style={{
                    width: '100%',
                    height: '380px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 600,
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <ZoomIn size={14} /> Click to Inspect 64-Canvas Grid
                </div>
              </div>
            </div>

            {/* Right Information & Timeline Scrubbing */}
            <div
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#ffffff'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#4f46e5',
                      backgroundColor: '#eef2ff',
                      padding: '4px 10px',
                      borderRadius: '16px'
                    }}
                  >
                    Epoch {activeSlide.epoch} of 75
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Live Training Snapshot
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#0f172a',
                    marginTop: '12px',
                    lineHeight: 1.3
                  }}
                >
                  {activeSlide.title}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    color: '#475569',
                    marginTop: '12px',
                    lineHeight: 1.6
                  }}
                >
                  {activeSlide.desc}
                </p>

                {/* Metrics for this epoch */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginTop: '20px'
                  }}
                >
                  <div
                    style={{
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                      Discriminator Loss
                    </span>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: '#0d9488', margin: '2px 0 0 0' }}>
                      {activeSlide.d_loss}
                    </p>
                  </div>
                  <div
                    style={{
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                      Generator Loss
                    </span>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: '#6366f1', margin: '2px 0 0 0' }}>
                      {activeSlide.g_loss}
                    </p>
                  </div>
                </div>
              </div>

              {/* Slider & Playback Controls */}
              <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#4f46e5',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(79, 70, 229, 0.3)'
                      }}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
                    </button>
                    <button
                      onClick={() => { setIsPlaying(false); setCurrentEpochIdx(0); }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <RotateCcw size={14} /> Reset to Noise
                    </button>
                  </div>

                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                    Step {currentEpochIdx + 1} of {EPOCH_SLIDES.length}
                  </span>
                </div>

                {/* Progress Buttons */}
                <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
                  {EPOCH_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.epoch}
                      onClick={() => { setIsPlaying(false); setCurrentEpochIdx(idx); }}
                      style={{
                        flex: 1,
                        height: '32px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: currentEpochIdx === idx ? '#4f46e5' : '#f1f5f9',
                        color: currentEpochIdx === idx ? '#ffffff' : '#64748b',
                        border: currentEpochIdx === idx ? 'none' : '1px solid #e2e8f0',
                        cursor: 'pointer'
                      }}
                    >
                      Ep {slide.epoch}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: cGAN 27-Style Comparison */}
      {activeTab === 'cgan' && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '28px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#0d9488',
                  backgroundColor: '#ccfbf1',
                  padding: '3px 8px',
                  borderRadius: '12px'
                }}
              >
                Conditional Art Generation
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
                cGAN: 27 Artistic Movements Side-by-Side Synthesis
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                Comparing Real WikiArt Masterpieces (Column A) with cGAN Synthetic Equivalents (Column B) conditioned on one-hot vector y ∈ R^27
              </p>
            </div>

            <button
              onClick={() =>
                onSelectImage(
                  '/assets/cgan_results.png',
                  '27-Style cGAN Benchmark Comparison',
                  'Side-by-side verification: Real paintings vs Generator output conditioned across all 27 WikiArt styles',
                  'Conditional Grid',
                  'cGAN'
                )
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: '#0d9488',
                color: '#ffffff',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              <ZoomIn size={16} /> Open High-Res 27-Style Matrix
            </button>
          </div>

          {/* Large Image View */}
          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#0a0f1d',
              padding: '16px',
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={() =>
              onSelectImage(
                '/assets/cgan_results.png',
                '27-Style cGAN Benchmark Comparison',
                'Side-by-side verification: Real paintings vs Generator output conditioned across all 27 WikiArt styles',
                'Conditional Grid',
                'cGAN'
              )
            }
          >
            <img
              src="/assets/cgan_results.png"
              alt="cGAN 27 styles comparison"
              style={{
                maxWidth: '100%',
                maxHeight: '520px',
                objectFit: 'contain',
                borderRadius: '6px'
              }}
            />
          </div>

          {/* Interactive Style Tags */}
          <div style={{ marginTop: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase' }}>
              Conditioned Artistic Classes Included in Model Embedding:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
              {ART_STYLES_LIST.map((style) => (
                <span
                  key={style}
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    backgroundColor: '#f1f5f9',
                    color: '#334155',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: CAN Creative Adversarial Artwork */}
      {activeTab === 'can' && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '28px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#d97706',
                  backgroundColor: '#fef3c7',
                  padding: '3px 8px',
                  borderRadius: '12px'
                }}
              >
                Autonomous Artistic Creativity
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
                CAN: Creative Adversarial Networks (Entropy-Driven Style Deviation)
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                Trained to maximize style ambiguity while preserving art authenticity. The network rejects copying established masters.
              </p>
            </div>

            <button
              onClick={() =>
                onSelectImage(
                  '/assets/CAN_examples.png',
                  'CAN Creative Masterpieces',
                  'Style-ambiguous synthesized artwork produced by entropy-maximizing loss formulation',
                  'Creative Masterpieces',
                  'CAN'
                )
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: '#d97706',
                color: '#ffffff',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              <ZoomIn size={16} /> Inspect High-Res Canvases
            </button>
          </div>

          {/* Large Image View */}
          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#0a0f1d',
              padding: '16px',
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={() =>
              onSelectImage(
                '/assets/CAN_examples.png',
                'CAN Creative Masterpieces',
                'Style-ambiguous synthesized artwork produced by entropy-maximizing loss formulation',
                'Creative Masterpieces',
                'CAN'
              )
            }
          >
            <img
              src="/assets/CAN_examples.png"
              alt="CAN creative artwork samples"
              style={{
                maxWidth: '100%',
                maxHeight: '520px',
                objectFit: 'contain',
                borderRadius: '6px'
              }}
            />
          </div>

          {/* Theoretical foundation */}
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: '#fffbeb',
              borderRadius: '12px',
              border: '1px solid #fde68a'
            }}
          >
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#92400e', marginBottom: '4px' }}>
              Colin Martindale's Psychological Theory of Aesthetic Evolution
            </h4>
            <p style={{ fontSize: '13px', color: '#78350f', lineHeight: 1.5, margin: 0 }}>
              CAN operationalizes psychological aesthetic theory: creative artists must increase arousal potential by deviating from existing habituated norms without descending into chaotic non-art noise. The dual-objective loss creates novel visual paradigms that human test evaluators attributed to leading 21st-century artists.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
