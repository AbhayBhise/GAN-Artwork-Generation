import React, { useState } from 'react'
import { GAN_BENCHMARK_METRICS, TRAINING_CHALLENGES } from '../data/modelsData'
import { ArrowRightLeft, ShieldAlert, Maximize2, Table as TableIcon } from 'lucide-react'

interface SideBySideProps {
  onSelectImage: (src: string, title: string, subtitle: string, badge: string, modelName: string) => void
}

export const SideBySideComparisonView: React.FC<SideBySideProps> = ({ onSelectImage }) => {
  const [modelA, setModelA] = useState<string>('dcgan')
  const [modelB, setModelB] = useState<string>('cgan')
  const [activeEpochCompare, setActiveEpochCompare] = useState<number>(74)

  const modelAData = GAN_BENCHMARK_METRICS[modelA]
  const modelBData = GAN_BENCHMARK_METRICS[modelB]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Top Banner Header */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '24px 32px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '4px 10px',
                backgroundColor: '#eef2ff',
                color: '#4f46e5',
                borderRadius: '20px',
                border: '1px solid #c7d2fe'
              }}
            >
              Side-by-Side Dual View
            </span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              Direct Empirical Comparison (WikiArt 22,632 Works)
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
            Model Output & Parameter Benchmarking
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
            Compare generated image grids side-by-side, inspect quantitative training metrics, and review technical challenges faced during training.
          </p>
        </div>

        {/* Model Selectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Left Model</span>
            <select
              value={modelA}
              onChange={(e) => setModelA(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#f8fafc',
                fontSize: '13px',
                fontWeight: 700,
                color: '#0f172a',
                cursor: 'pointer'
              }}
            >
              <option value="dcgan">DCGAN (Baseline Unconditional)</option>
              <option value="cgan">cGAN (27-Movement Conditional)</option>
              <option value="can">CAN (Creative Ambiguity GAN)</option>
            </select>
          </div>

          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '18px',
              color: '#4f46e5'
            }}
          >
            <ArrowRightLeft size={16} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Right Model</span>
            <select
              value={modelB}
              onChange={(e) => setModelB(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#f8fafc',
                fontSize: '13px',
                fontWeight: 700,
                color: '#0f172a',
                cursor: 'pointer'
              }}
            >
              <option value="cgan">cGAN (27-Movement Conditional)</option>
              <option value="dcgan">DCGAN (Baseline Unconditional)</option>
              <option value="can">CAN (Creative Ambiguity GAN)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SIDE-BY-SIDE VISUAL OUTPUT COMPARISON (Like ChestXray Comparison) */}
      {/* ========================================================================= */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '28px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
              Synchronized Visual Canvas Comparison
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              Comparing: <strong>{modelAData.name}</strong> vs <strong>{modelBData.name}</strong> (Resolution: 64x64x3 RGB)
            </p>
          </div>

          {/* Quick Epoch Selector for DCGAN progression */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>DCGAN Epoch:</span>
            {[0, 10, 20, 30, 50, 74].map((ep) => (
              <button
                key={ep}
                onClick={() => setActiveEpochCompare(ep)}
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: activeEpochCompare === ep ? '#4f46e5' : '#f1f5f9',
                  color: activeEpochCompare === ep ? '#ffffff' : '#475569',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Ep {ep}
              </button>
            ))}
          </div>
        </div>

        {/* The Dual Split Screens */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Left Canvas */}
          <div
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '16px',
              padding: '16px',
              border: `2px solid ${modelAData.tagColor}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#ffffff',
                  backgroundColor: modelAData.tagColor,
                  padding: '3px 10px',
                  borderRadius: '8px'
                }}
              >
                {modelAData.name} {modelA === 'dcgan' ? `(Epoch ${activeEpochCompare})` : ''}
              </span>
              <button
                onClick={() =>
                  onSelectImage(
                    modelA === 'dcgan' ? `/assets/fake_samples_epoch_${activeEpochCompare}.png` : modelAData.sampleImage,
                    modelAData.name,
                    modelAData.caption,
                    `Epoch ${activeEpochCompare}`,
                    modelAData.name
                  )
                }
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px'
                }}
              >
                <Maximize2 size={14} /> Fullscreen
              </button>
            </div>

            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#020617',
                minHeight: '380px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() =>
                onSelectImage(
                  modelA === 'dcgan' ? `/assets/fake_samples_epoch_${activeEpochCompare}.png` : modelAData.sampleImage,
                  modelAData.name,
                  modelAData.caption,
                  `Epoch ${activeEpochCompare}`,
                  modelAData.name
                )
              }
            >
              <img
                src={modelA === 'dcgan' ? `/assets/fake_samples_epoch_${activeEpochCompare}.png` : modelAData.sampleImage}
                alt={modelAData.name}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </div>
            <p style={{ fontSize: '12px', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>
              {modelAData.caption}
            </p>
          </div>

          {/* Right Canvas */}
          <div
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '16px',
              padding: '16px',
              border: `2px solid ${modelBData.tagColor}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#ffffff',
                  backgroundColor: modelBData.tagColor,
                  padding: '3px 10px',
                  borderRadius: '8px'
                }}
              >
                {modelBData.name} {modelB === 'dcgan' ? `(Epoch ${activeEpochCompare})` : ''}
              </span>
              <button
                onClick={() =>
                  onSelectImage(
                    modelB === 'dcgan' ? `/assets/fake_samples_epoch_${activeEpochCompare}.png` : modelBData.sampleImage,
                    modelBData.name,
                    modelBData.caption,
                    `Epoch ${activeEpochCompare}`,
                    modelBData.name
                  )
                }
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px'
                }}
              >
                <Maximize2 size={14} /> Fullscreen
              </button>
            </div>

            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#020617',
                minHeight: '380px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() =>
                onSelectImage(
                  modelB === 'dcgan' ? `/assets/fake_samples_epoch_${activeEpochCompare}.png` : modelBData.sampleImage,
                  modelBData.name,
                  modelBData.caption,
                  `Epoch ${activeEpochCompare}`,
                  modelBData.name
                )
              }
            >
              <img
                src={modelB === 'dcgan' ? `/assets/fake_samples_epoch_${activeEpochCompare}.png` : modelBData.sampleImage}
                alt={modelBData.name}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </div>
            <p style={{ fontSize: '12px', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>
              {modelBData.caption}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. NUMERIC PARAMETERS & BENCHMARK TABLE (Exactly Like Google Colab Table) */}
      {/* ========================================================================= */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '28px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <TableIcon size={20} color="#4f46e5" />
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
            Empirical Architecture & Evaluation Parameter Table
          </h3>
        </div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
          Exact numerical parameter counts, training duration, loss values, and recorded Frechet Inception Distance (FID) metrics.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
              fontFamily: 'var(--font-sans)'
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700, color: '#334155' }}>
                  Evaluation Metric / Parameter
                </th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontWeight: 700, color: '#4f46e5' }}>
                  DCGAN (Baseline)
                </th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontWeight: 700, color: '#0d9488' }}>
                  Conditional GAN (cGAN)
                </th>
                <th style={{ textAlign: 'center', padding: '12px 16px', fontWeight: 700, color: '#d97706' }}>
                  CAN (Creative GAN)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Training Images', dc: '22,632', cg: '22,632 (Labeled)', can: '22,632 (27 Styles)' },
                { metric: 'Image Resolution', dc: '64 × 64 × 3', cg: '64 × 64 × 3', can: '64 × 64 × 3' },
                { metric: 'Total Epochs Trained', dc: '75 Epochs', cg: '75 Epochs', can: '75 Epochs' },
                { metric: 'Batch Size', dc: '128', cg: '128', can: '64' },
                { metric: 'Latent Dimension (z)', dc: '150', cg: '150 (+ 27 Class Embedding)', can: '150' },
                { metric: 'Real-Label Target (Label Smoothing)', dc: '0.9', cg: '0.9', can: '0.9' },
                { metric: 'Generator Parameters', dc: '3,986,304 (3.98M)', cg: '4,208,217 (4.21M)', can: '3,986,304 (3.98M)' },
                { metric: 'Discriminator Parameters', dc: '694,657 (0.69M)', cg: '709,210 (0.71M)', can: '708,091 (Dual-Head)' },
                { metric: 'Training Hardware', dc: 'RTX 4050 GPU (CUDA)', cg: 'RTX 4050 GPU (CUDA)', can: 'RTX 4050 GPU (CUDA)' },
                { metric: 'Training Time per Batch', dc: '1.87s (0.052s compute)', cg: '2.14s (0.061s compute)', can: '2.42s (0.075s compute)' },
                { metric: 'Final D(x) Real Probability', dc: '0.841', cg: '0.785', can: '0.712' },
                { metric: 'Final D(G(z)) Fake Probability', dc: '0.059', cg: '0.082', can: '0.145' },
                { metric: 'Final Discriminator Loss (L_D)', dc: '0.61 ± 0.04', cg: '0.78 ± 0.06', can: '0.94 ± 0.08' },
                { metric: 'Final Generator Loss (L_G)', dc: '2.69 ± 0.12', cg: '2.41 ± 0.15', can: '3.15 ± 0.18' },
                { metric: 'FID Score (Lower is better)', dc: '28.4', cg: '24.1 (Movement-guided)', can: '31.2 (Novelty deviation)' }
              ].map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: '1px solid #e2e8f0',
                    backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc'
                  }}
                >
                  <td style={{ padding: '10px 16px', fontWeight: 600, color: '#1e293b' }}>
                    {row.metric}
                  </td>
                  <td style={{ textAlign: 'center', padding: '10px 16px', color: '#334155', fontFamily: 'var(--font-mono)' }}>
                    {row.dc}
                  </td>
                  <td style={{ textAlign: 'center', padding: '10px 16px', color: '#0d9488', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    {row.cg}
                  </td>
                  <td style={{ textAlign: 'center', padding: '10px 16px', color: '#d97706', fontFamily: 'var(--font-mono)' }}>
                    {row.can}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CHALLENGES FACED DURING DCGAN & REMEDIATIONS */}
      {/* ========================================================================= */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '28px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <ShieldAlert size={20} color="#dc2626" />
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
            Technical Challenges Faced During DCGAN Implementation & Training
          </h3>
        </div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
          Key failure modes observed during deep convolutional training, mathematical causes, and applied engineering solutions:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
          {TRAINING_CHALLENGES.map((ch, idx) => (
            <div
              key={idx}
              style={{
                padding: '20px',
                borderRadius: '14px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {idx + 1}
                </span>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                  {ch.title}
                </h4>
              </div>

              <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.5 }}>
                <strong>Issue Observed:</strong> {ch.issue}
              </p>

              <div style={{ padding: '10px 12px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0', marginTop: '4px' }}>
                <p style={{ fontSize: '12px', color: '#166534', margin: 0, lineHeight: 1.4 }}>
                  <strong>Engineering Solution Applied:</strong> {ch.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
