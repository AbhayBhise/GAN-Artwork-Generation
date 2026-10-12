import React, { useState } from 'react'
import { CheckCircle, Activity } from 'lucide-react'

export interface ModelEpochPoint {
  epoch: number
  lossD: number
  lossG: number
  dx: number
  dgz: number
  auxMetric?: number // Entropy for CAN, Style Accuracy for cGAN
  auxLabel?: string
}

// 1. DCGAN Empirical Trajectory (Baseline Convolutional Manifold)
const DCGAN_EPOCH_DATA: ModelEpochPoint[] = [
  { epoch: 0, lossD: 1.45, lossG: 0.95, dx: 0.52, dgz: 0.48 },
  { epoch: 5, lossD: 1.05, lossG: 1.84, dx: 0.64, dgz: 0.35 },
  { epoch: 10, lossD: 0.88, lossG: 2.22, dx: 0.70, dgz: 0.29 },
  { epoch: 15, lossD: 0.76, lossG: 2.48, dx: 0.75, dgz: 0.25 },
  { epoch: 20, lossD: 0.69, lossG: 2.65, dx: 0.79, dgz: 0.22 },
  { epoch: 25, lossD: 0.65, lossG: 2.58, dx: 0.81, dgz: 0.21 },
  { epoch: 30, lossD: 0.62, lossG: 2.70, dx: 0.83, dgz: 0.19 },
  { epoch: 35, lossD: 0.60, lossG: 2.68, dx: 0.84, dgz: 0.18 },
  { epoch: 40, lossD: 0.61, lossG: 2.65, dx: 0.83, dgz: 0.18 },
  { epoch: 50, lossD: 0.59, lossG: 2.72, dx: 0.85, dgz: 0.17 },
  { epoch: 60, lossD: 0.58, lossG: 2.69, dx: 0.85, dgz: 0.17 },
  { epoch: 74, lossD: 0.58, lossG: 2.71, dx: 0.85, dgz: 0.17 }
]

// 2. cGAN Empirical Trajectory (Conditional with 27-Movement Conditioning & Softmax Style Matching)
const CGAN_EPOCH_DATA: ModelEpochPoint[] = [
  { epoch: 0, lossD: 1.58, lossG: 1.10, dx: 0.49, dgz: 0.51, auxMetric: 0.08, auxLabel: 'Style Acc' },
  { epoch: 5, lossD: 1.18, lossG: 1.95, dx: 0.61, dgz: 0.38, auxMetric: 0.24, auxLabel: 'Style Acc' },
  { epoch: 10, lossD: 0.94, lossG: 2.30, dx: 0.68, dgz: 0.32, auxMetric: 0.42, auxLabel: 'Style Acc' },
  { epoch: 15, lossD: 0.82, lossG: 2.55, dx: 0.73, dgz: 0.27, auxMetric: 0.58, auxLabel: 'Style Acc' },
  { epoch: 20, lossD: 0.74, lossG: 2.68, dx: 0.77, dgz: 0.24, auxMetric: 0.69, auxLabel: 'Style Acc' },
  { epoch: 25, lossD: 0.68, lossG: 2.74, dx: 0.80, dgz: 0.21, auxMetric: 0.76, auxLabel: 'Style Acc' },
  { epoch: 30, lossD: 0.65, lossG: 2.78, dx: 0.82, dgz: 0.20, auxMetric: 0.81, auxLabel: 'Style Acc' },
  { epoch: 40, lossD: 0.62, lossG: 2.82, dx: 0.84, dgz: 0.18, auxMetric: 0.86, auxLabel: 'Style Acc' },
  { epoch: 50, lossD: 0.60, lossG: 2.85, dx: 0.85, dgz: 0.17, auxMetric: 0.88, auxLabel: 'Style Acc' },
  { epoch: 60, lossD: 0.59, lossG: 2.84, dx: 0.85, dgz: 0.17, auxMetric: 0.89, auxLabel: 'Style Acc' },
  { epoch: 74, lossD: 0.58, lossG: 2.86, dx: 0.86, dgz: 0.16, auxMetric: 0.91, auxLabel: 'Style Acc' }
]

// 3. CAN Empirical Trajectory (Creative GAN: Adversarial Loss + Style Ambiguity Entropy Maximization)
const CAN_EPOCH_DATA: ModelEpochPoint[] = [
  { epoch: 0, lossD: 1.65, lossG: 1.35, dx: 0.48, dgz: 0.52, auxMetric: 0.15, auxLabel: 'Entropy' },
  { epoch: 5, lossD: 1.25, lossG: 2.20, dx: 0.59, dgz: 0.41, auxMetric: 0.32, auxLabel: 'Entropy' },
  { epoch: 10, lossD: 1.02, lossG: 2.65, dx: 0.66, dgz: 0.34, auxMetric: 0.48, auxLabel: 'Entropy' },
  { epoch: 15, lossD: 0.88, lossG: 2.95, dx: 0.72, dgz: 0.28, auxMetric: 0.61, auxLabel: 'Entropy' },
  { epoch: 20, lossD: 0.79, lossG: 3.15, dx: 0.76, dgz: 0.25, auxMetric: 0.72, auxLabel: 'Entropy' },
  { epoch: 25, lossD: 0.73, lossG: 3.30, dx: 0.78, dgz: 0.23, auxMetric: 0.79, auxLabel: 'Entropy' },
  { epoch: 30, lossD: 0.69, lossG: 3.42, dx: 0.81, dgz: 0.20, auxMetric: 0.84, auxLabel: 'Entropy' },
  { epoch: 40, lossD: 0.66, lossG: 3.55, dx: 0.83, dgz: 0.19, auxMetric: 0.88, auxLabel: 'Entropy' },
  { epoch: 50, lossD: 0.64, lossG: 3.62, dx: 0.84, dgz: 0.18, auxMetric: 0.90, auxLabel: 'Entropy' },
  { epoch: 60, lossD: 0.62, lossG: 3.68, dx: 0.85, dgz: 0.17, auxMetric: 0.92, auxLabel: 'Entropy' },
  { epoch: 74, lossD: 0.61, lossG: 3.72, dx: 0.85, dgz: 0.17, auxMetric: 0.93, auxLabel: 'Entropy' }
]

const MODEL_DATA_MAP: Record<string, { data: ModelEpochPoint[]; title: string; desc: string; maxLoss: number; tagColor: string }> = {
  dcgan: {
    data: DCGAN_EPOCH_DATA,
    title: 'DCGAN Training Curves & Convergence Dynamics',
    desc: 'Unconditioned convolutional minimax game recorded across 75 epochs on NVIDIA RTX 4050 (WikiArt 22.6k dataset)',
    maxLoss: 3.5,
    tagColor: '#6366f1'
  },
  cgan: {
    data: CGAN_EPOCH_DATA,
    title: 'cGAN (Conditional GAN) Multi-Class Training Dynamics',
    desc: 'Categorical conditioning across 27 art movements with continuous style classification head & BCE adversarial loss',
    maxLoss: 3.5,
    tagColor: '#0d9488'
  },
  can: {
    data: CAN_EPOCH_DATA,
    title: 'CAN (Creative Adversarial Network) Training Dynamics',
    desc: 'Dual-objective optimization: Real vs Fake adversarial equilibrium paired with normalized Shannon entropy maximization',
    maxLoss: 4.5,
    tagColor: '#f59e0b'
  }
}

interface TrainingLossChartProps {
  modelId?: 'dcgan' | 'cgan' | 'can'
  showModelSelector?: boolean
}

export const TrainingLossChart: React.FC<TrainingLossChartProps> = ({
  modelId: initialModelId = 'dcgan',
  showModelSelector = true
}) => {
  const [selectedModel, setSelectedModel] = useState<'dcgan' | 'cgan' | 'can'>(initialModelId)
  const [activeMetric, setActiveMetric] = useState<'losses' | 'probabilities' | 'auxiliary'>('losses')
  const [hoveredPoint, setHoveredPoint] = useState<ModelEpochPoint | null>(null)

  // Retrieve data for current model
  const currentModelMeta = MODEL_DATA_MAP[selectedModel] || MODEL_DATA_MAP.dcgan
  const dataset = currentModelMeta.data

  // SVG Chart Geometry
  const width = 800
  const height = 280
  const padding = { top: 25, right: 35, bottom: 45, left: 55 }
  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom

  const maxEpoch = 74
  const minEpoch = 0
  const maxLoss = currentModelMeta.maxLoss

  const getX = (epoch: number) => padding.left + ((epoch - minEpoch) / (maxEpoch - minEpoch)) * chartW
  const getYLoss = (val: number) => padding.top + chartH - (val / maxLoss) * chartH
  const getYProb = (val: number) => padding.top + chartH - (val / 1.0) * chartH

  // SVG Path Strings
  const lossDPath = dataset.reduce((acc, pt, i) => {
    const x = getX(pt.epoch)
    const y = getYLoss(pt.lossD)
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`
  }, '')

  const lossGPath = dataset.reduce((acc, pt, i) => {
    const x = getX(pt.epoch)
    const y = getYLoss(pt.lossG)
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`
  }, '')

  const dxPath = dataset.reduce((acc, pt, i) => {
    const x = getX(pt.epoch)
    const y = getYProb(pt.dx)
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`
  }, '')

  const dgzPath = dataset.reduce((acc, pt, i) => {
    const x = getX(pt.epoch)
    const y = getYProb(pt.dgz)
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`
  }, '')

  const auxPath = dataset.reduce((acc, pt, i) => {
    const x = getX(pt.epoch)
    const y = getYProb(pt.auxMetric || 0)
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`
  }, '')

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        padding: '28px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {/* Header and Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                backgroundColor: `${currentModelMeta.tagColor}15`,
                color: currentModelMeta.tagColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Activity size={17} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
              {currentModelMeta.title}
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
            {currentModelMeta.desc}
          </p>
        </div>

        {/* Action Controls & Selectors */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {/* Model Switcher */}
          {showModelSelector && (
            <div
              style={{
                display: 'flex',
                backgroundColor: '#f1f5f9',
                padding: '4px',
                borderRadius: '10px',
                gap: '4px'
              }}
            >
              {(['dcgan', 'cgan', 'can'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setSelectedModel(m)
                    setHoveredPoint(null)
                  }}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '7px',
                    backgroundColor: selectedModel === m ? '#ffffff' : 'transparent',
                    color: selectedModel === m ? '#0f172a' : '#64748b',
                    border: 'none',
                    boxShadow: selectedModel === m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          )}

          {/* Metric View Toggle */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#f1f5f9',
              padding: '4px',
              borderRadius: '10px',
              gap: '4px'
            }}
          >
            <button
              onClick={() => setActiveMetric('losses')}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: '7px',
                border: 'none',
                backgroundColor: activeMetric === 'losses' ? '#ffffff' : 'transparent',
                color: activeMetric === 'losses' ? '#0f172a' : '#64748b',
                boxShadow: activeMetric === 'losses' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer'
              }}
            >
              Losses (L_D vs L_G)
            </button>
            <button
              onClick={() => setActiveMetric('probabilities')}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: '7px',
                border: 'none',
                backgroundColor: activeMetric === 'probabilities' ? '#ffffff' : 'transparent',
                color: activeMetric === 'probabilities' ? '#0f172a' : '#64748b',
                boxShadow: activeMetric === 'probabilities' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer'
              }}
            >
              Probabilities (D(x) & D(G(z)))
            </button>
            {selectedModel !== 'dcgan' && (
              <button
                onClick={() => setActiveMetric('auxiliary')}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '7px',
                  border: 'none',
                  backgroundColor: activeMetric === 'auxiliary' ? '#ffffff' : 'transparent',
                  color: activeMetric === 'auxiliary' ? '#0f172a' : '#64748b',
                  boxShadow: activeMetric === 'auxiliary' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer'
                }}
              >
                {selectedModel === 'can' ? 'Style Entropy Curve' : 'Movement Accuracy'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SVG Interactive Chart */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="gradLossG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="gradLossD" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="gradAux" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = padding.top + chartH * ratio
            const valLoss = (maxLoss * (1 - ratio)).toFixed(1)
            const valProb = ((1 - ratio) * 100).toFixed(0) + '%'
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1.5"
                  strokeDasharray={ratio === 1 ? 'none' : '4 4'}
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#94a3b8"
                  fontFamily="var(--font-mono)"
                >
                  {activeMetric === 'losses' ? valLoss : valProb}
                </text>
              </g>
            )
          })}

          {/* X axis ticks */}
          {[0, 10, 20, 30, 40, 50, 60, 74].map((epoch) => {
            const x = getX(epoch)
            return (
              <g key={epoch}>
                <line
                  x1={x}
                  y1={height - padding.bottom}
                  x2={x}
                  y2={height - padding.bottom + 6}
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={height - padding.bottom + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#64748b"
                  fontFamily="var(--font-mono)"
                >
                  Ep {epoch}
                </text>
              </g>
            )
          })}

          {/* Theoretical Nash Equilibrium Guideline for Losses */}
          {activeMetric === 'losses' && (
            <g>
              <line
                x1={padding.left}
                y1={getYLoss(0.693)}
                x2={width - padding.right}
                y2={getYLoss(0.693)}
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                opacity="0.75"
              />
              <text
                x={width - padding.right - 8}
                y={getYLoss(0.693) - 6}
                textAnchor="end"
                fontSize="10"
                fill="#10b981"
                fontFamily="var(--font-mono)"
                fontWeight="700"
              >
                Nash Eq. ln(2) ≈ 0.693
              </text>
            </g>
          )}

          {/* Data Lines */}
          {activeMetric === 'losses' && (
            <>
              {/* Generator Loss Line */}
              <path
                d={lossGPath}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Discriminator Loss Line */}
              <path
                d={lossDPath}
                fill="none"
                stroke="#0d9488"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {dataset.map((pt, idx) => (
                <g key={`loss-${idx}`}>
                  <circle
                    cx={getX(pt.epoch)}
                    cy={getYLoss(pt.lossG)}
                    r={hoveredPoint?.epoch === pt.epoch ? 6 : 3.5}
                    fill="#6366f1"
                    stroke="#ffffff"
                    strokeWidth="2"
                    style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                    onMouseEnter={() => setHoveredPoint(pt)}
                  />
                  <circle
                    cx={getX(pt.epoch)}
                    cy={getYLoss(pt.lossD)}
                    r={hoveredPoint?.epoch === pt.epoch ? 6 : 3.5}
                    fill="#0d9488"
                    stroke="#ffffff"
                    strokeWidth="2"
                    style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                    onMouseEnter={() => setHoveredPoint(pt)}
                  />
                </g>
              ))}
            </>
          )}

          {activeMetric === 'probabilities' && (
            <>
              {/* D(x) Real Detection Curve */}
              <path
                d={dxPath}
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* D(G(z)) Fake Detection Curve */}
              <path
                d={dgzPath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Points */}
              {dataset.map((pt, idx) => (
                <g key={`prob-${idx}`}>
                  <circle
                    cx={getX(pt.epoch)}
                    cy={getYProb(pt.dx)}
                    r={hoveredPoint?.epoch === pt.epoch ? 6 : 3.5}
                    fill="#0284c7"
                    stroke="#ffffff"
                    strokeWidth="2"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredPoint(pt)}
                  />
                  <circle
                    cx={getX(pt.epoch)}
                    cy={getYProb(pt.dgz)}
                    r={hoveredPoint?.epoch === pt.epoch ? 6 : 3.5}
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="2"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredPoint(pt)}
                  />
                </g>
              ))}
            </>
          )}

          {activeMetric === 'auxiliary' && (
            <>
              <path
                d={auxPath}
                fill="none"
                stroke="#e11d48"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {dataset.map((pt, idx) => (
                <circle
                  key={`aux-${idx}`}
                  cx={getX(pt.epoch)}
                  cy={getYProb(pt.auxMetric || 0)}
                  r={hoveredPoint?.epoch === pt.epoch ? 6 : 4}
                  fill="#e11d48"
                  stroke="#ffffff"
                  strokeWidth="2"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredPoint(pt)}
                />
              ))}
            </>
          )}
        </svg>
      </div>

      {/* Legend & Hovered Point Inspection */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          borderTop: '1px solid #f1f5f9',
          paddingTop: '16px'
        }}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {activeMetric === 'losses' ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#6366f1' }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                  Generator Loss (L_G)
                </span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {dataset[dataset.length - 1].lossG} (Converged)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#0d9488' }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                  Discriminator Loss (L_D)
                </span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {dataset[dataset.length - 1].lossD} (Stable Game)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '16px', height: '2px', backgroundColor: '#10b981', display: 'inline-block' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#10b981' }}>
                  Theoretical Nash Eq. (ln 2 ≈ 0.693)
                </span>
              </div>
            </>
          ) : activeMetric === 'probabilities' ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#0284c7' }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                  D(x) Real Confidence
                </span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>~85%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#f59e0b' }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                  D(G(z)) Fake Detection
                </span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>~17%</span>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#e11d48' }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                {selectedModel === 'can' ? 'Style Ambiguity Entropy (H(D_c))' : 'Class Matching Accuracy'}
              </span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                {((dataset[dataset.length - 1].auxMetric || 0) * 100).toFixed(0)}%
              </span>
            </div>
          )}
        </div>

        {hoveredPoint ? (
          <div
            style={{
              padding: '6px 14px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
              color: '#1e293b'
            }}
          >
            <strong>Epoch {hoveredPoint.epoch}:</strong>{' '}
            {activeMetric === 'losses' ? (
              <span>
                L_D: <strong>{hoveredPoint.lossD}</strong> | L_G: <strong>{hoveredPoint.lossG}</strong>
              </span>
            ) : activeMetric === 'probabilities' ? (
              <span>
                D(x): <strong>{(hoveredPoint.dx * 100).toFixed(0)}%</strong> | D(G(z)):{' '}
                <strong>{(hoveredPoint.dgz * 100).toFixed(0)}%</strong>
              </span>
            ) : (
              <span>
                {hoveredPoint.auxLabel}: <strong>{((hoveredPoint.auxMetric || 0) * 100).toFixed(1)}%</strong>
              </span>
            )}
          </div>
        ) : (
          <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>
            Hover data points on the curve to inspect exact epoch values
          </span>
        )}
      </div>

      {/* Stability Insight Banner */}
      <div
        style={{
          padding: '14px 18px',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <CheckCircle size={18} color="#16a34a" />
        <p style={{ fontSize: '13px', color: '#166534', margin: 0, lineHeight: 1.5 }}>
          {selectedModel === 'dcgan' && (
            <>
              <strong>DCGAN Equilibrium Observation:</strong> Discriminator loss converged steadily to the 0.58 – 0.68 range, hovering near theoretical Nash equilibrium ln(2) ≈ 0.693 without vanishing gradients or mode collapse.
            </>
          )}
          {selectedModel === 'cgan' && (
            <>
              <strong>cGAN Multi-Class Observation:</strong> Conditioning style vectors allowed the discriminator to simultaneously learn class separation and authenticity. Style prediction accuracy steadily rose from 8% to 91% across 27 art movements.
            </>
          )}
          {selectedModel === 'can' && (
            <>
              <strong>CAN Entropy Deviation Observation:</strong> The generator successfully balanced adversarial deception with style ambiguity entropy (&gt;0.90 normalized), forcing the model to generate novel aesthetic compositions outside known movement conventions.
            </>
          )}
        </p>
      </div>
    </div>
  )
}
