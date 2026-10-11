import React, { useState } from 'react'
import { GAN_MODELS } from '../data/modelsData'
import { ShieldCheck, Zap, Sigma } from 'lucide-react'

export const ArchitectureExplainer: React.FC = () => {
  const [selectedArch, setSelectedArch] = useState<'dcgan' | 'cgan' | 'can'>('dcgan')

  const model = GAN_MODELS.find(m => m.id === selectedArch) || GAN_MODELS[0]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Selector header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          backgroundColor: '#ffffff',
          padding: '20px 24px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
        }}
      >
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            Neural Pipeline Architectures & Mathematical Foundations
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
            Explore tensor transformations, layer dimensions, activations, and objective equations
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {GAN_MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedArch(m.id as any)}
              style={{
                padding: '8px 18px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 600,
                backgroundColor: selectedArch === m.id ? m.accentColor : '#f8fafc',
                color: selectedArch === m.id ? m.tagColor : '#475569',
                border: selectedArch === m.id ? `2px solid ${m.tagColor}` : '1px solid #cbd5e1',
                cursor: 'pointer'
              }}
            >
              {m.name} Blueprint
            </button>
          ))}
        </div>
      </div>

      {/* Main Architecture Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '32px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}
      >
        {/* Model Headline */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: model.tagColor,
                backgroundColor: model.accentColor,
                padding: '3px 10px',
                borderRadius: '12px',
                textTransform: 'uppercase'
              }}
            >
              {model.name} Formal Specification
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '8px' }}>
              {model.fullName}
            </h2>
            <p style={{ fontSize: '14px', color: '#475569', marginTop: '6px', maxWidth: '800px', lineHeight: 1.6 }}>
              {model.description}
            </p>
          </div>

          <a
            href={model.paperUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '8px 16px',
              backgroundColor: '#f1f5f9',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#334155',
              border: '1px solid #e2e8f0'
            }}
          >
            Read Original Paper ↗
          </a>
        </div>

        {/* Mathematical Formulation Box */}
        <div
          style={{
            backgroundColor: '#fafbfc',
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            padding: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Sigma size={18} color="#4f46e5" />
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Mathematical Optimization Objective
            </h4>
          </div>

          <div
            style={{
              backgroundColor: '#0f172a',
              color: '#38bdf8',
              padding: '18px 24px',
              borderRadius: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              lineHeight: 1.7,
              overflowX: 'auto',
              border: '1px solid #1e293b'
            }}
          >
            {model.lossFormula}
          </div>

          <div style={{ marginTop: '16px', fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
            {selectedArch === 'dcgan' && (
              <p>
                <strong>DCGAN MinMax Mechanics:</strong> The Discriminator (D) is trained with gradient ascent to maximize log(D(x)) for genuine WikiArt paintings while minimizing log(D(G(z))) for generator fakes. Concurrently, Generator (G) is trained to minimize log(1 - D(G(z))), practically re-formulated as maximizing log(D(G(z))) to eliminate vanishing gradients early in training.
              </p>
            )}
            {selectedArch === 'cgan' && (
              <p>
                <strong>cGAN Conditional Grounding:</strong> Both the generator and discriminator receive a joint conditioning label vector <code>y ∈ R^27</code>. The discriminator must not only evaluate whether the visual features look painterly, but also verify whether the stylistic attributes specifically match class <code>y</code> (e.g. Impressionism).
              </p>
            )}
            {selectedArch === 'can' && (
              <p>
                <strong>CAN Entropy Maximization:</strong> The second term computes the normalized Shannon entropy across 27 artistic movements. Generator G receives highest rewards when discriminator D confirms the image is an authentic painting (first term), yet has maximum ambiguity/confusion across which historical style it represents (second term).
              </p>
            )}
          </div>
        </div>

        {/* Neural Network Pipeline Blueprint */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Generator Pipeline */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Zap size={18} color="#6366f1" />
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                Generator Network Architecture (G)
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px', backgroundColor: '#eef2ff', borderRadius: '8px', border: '1px solid #c7d2fe' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#4338ca', textTransform: 'uppercase' }}>
                  Input Layer
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e1b4b', marginTop: '2px' }}>
                  {model.generatorInput}
                </div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Layer 1: Project & Reshape</div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0f172a' }}>
                  Linear(150 → 512 × 4 × 4) + Reshape [B, 512, 4, 4]
                </div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Layer 2: Transposed Conv 1</div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0f172a' }}>
                  ConvTranspose2d(512 → 256, k=4, s=2, p=1) → [B, 256, 8, 8]
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>+ BatchNorm2d + ReLU</div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Layer 3: Transposed Conv 2</div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0f172a' }}>
                  ConvTranspose2d(256 → 128, k=4, s=2, p=1) → [B, 128, 16, 16]
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>+ BatchNorm2d + ReLU</div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Layer 4: Transposed Conv 3</div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0f172a' }}>
                  ConvTranspose2d(128 → 64, k=4, s=2, p=1) → [B, 64, 32, 32]
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>+ BatchNorm2d + ReLU</div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                  Output Layer: Canvas Synthesis
                </div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#14532d', marginTop: '2px' }}>
                  ConvTranspose2d(64 → 3, k=4, s=2, p=1) + Tanh → [B, 3, 64, 64]
                </div>
              </div>
            </div>
          </div>

          {/* Discriminator Pipeline */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <ShieldCheck size={18} color="#0d9488" />
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                Discriminator Network Architecture (D)
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px', backgroundColor: '#ccfbf1', borderRadius: '8px', border: '1px solid #99f6e4' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#115e59', textTransform: 'uppercase' }}>
                  Input Canvas
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#134e4a', marginTop: '2px' }}>
                  {model.discriminatorInput}
                </div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Layer 1: Spatial Strided Conv</div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0f172a' }}>
                  Conv2d(3 → 64, k=4, s=2, p=1) → [B, 64, 32, 32]
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>+ LeakyReLU(0.2, inplace)</div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Layer 2: Downsampling Conv 2</div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0f172a' }}>
                  Conv2d(64 → 128, k=4, s=2, p=1) → [B, 128, 16, 16]
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>+ BatchNorm2d + LeakyReLU(0.2)</div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Layer 3: Downsampling Conv 3</div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0f172a' }}>
                  Conv2d(128 → 256, k=4, s=2, p=1) → [B, 256, 8, 8]
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>+ BatchNorm2d + LeakyReLU(0.2)</div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>Layer 4: Downsampling Conv 4</div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0f172a' }}>
                  Conv2d(256 → 512, k=4, s=2, p=1) → [B, 512, 4, 4]
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>+ BatchNorm2d + LeakyReLU(0.2)</div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#92400e', textTransform: 'uppercase' }}>
                  Discriminator Head
                </div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#78350f', marginTop: '2px' }}>
                  Conv2d(512 → 1, k=4, s=1, p=0) + Sigmoid → Probability [B, 1, 1, 1]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
