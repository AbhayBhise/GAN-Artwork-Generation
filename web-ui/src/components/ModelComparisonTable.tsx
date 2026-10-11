import React, { useState } from 'react'
import { GAN_MODELS } from '../data/modelsData'
import { Check, AlertCircle, Sparkles, Maximize2 } from 'lucide-react'

interface ModelComparisonProps {
  onSelectImage: (src: string, title: string, subtitle: string, badge: string, modelName: string) => void
}

export const ModelComparisonTable: React.FC<ModelComparisonProps> = ({ onSelectImage }) => {
  const [selectedModels, setSelectedModels] = useState<string[]>(['dcgan', 'cgan'])

  const toggleModel = (id: string) => {
    if (selectedModels.includes(id)) {
      if (selectedModels.length > 1) {
        setSelectedModels(selectedModels.filter(m => m !== id))
      }
    } else {
      setSelectedModels([...selectedModels, id])
    }
  }

  const activeModels = GAN_MODELS.filter(m => selectedModels.includes(m.id))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Selector Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          backgroundColor: '#ffffff',
          padding: '18px 24px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
        }}
      >
        <div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>
            Multi-Model Side-by-Side Architectural Comparator
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
            Select models to contrast their formulation, tensor pipelines, loss objectives, and synthesized outputs
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {GAN_MODELS.map((model) => {
            const isSelected = selectedModels.includes(model.id)
            return (
              <button
                key={model.id}
                onClick={() => toggleModel(model.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: isSelected ? `2px solid ${model.tagColor}` : '1px solid #cbd5e1',
                  backgroundColor: isSelected ? model.accentColor : '#f8fafc',
                  color: isSelected ? model.tagColor : '#475569',
                  cursor: 'pointer'
                }}
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: model.tagColor
                  }}
                />
                {model.name}
                {isSelected && <Check size={14} />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid Comparison Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${activeModels.length}, minmax(320px, 1fr))`,
          gap: '24px',
          alignItems: 'stretch'
        }}
      >
        {activeModels.map((model) => (
          <div
            key={model.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: `1px solid ${model.tagColor}40`,
              overflow: 'hidden',
              boxShadow: '0 10px 20px -5px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header Card */}
            <div
              style={{
                padding: '24px',
                borderBottom: '1px solid #f1f5f9',
                backgroundColor: model.accentColor
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: model.tagColor,
                    backgroundColor: '#ffffff',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                >
                  {model.name}
                </span>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                  {model.paperRef.split('(')[0]}
                </span>
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginTop: '10px',
                  lineHeight: 1.3
                }}
              >
                {model.fullName}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: '#334155',
                  marginTop: '8px',
                  lineHeight: 1.5
                }}
              >
                {model.description}
              </p>
            </div>

            {/* Showcase Output Sample */}
            <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase' }}>
                  Model Output Synthesis
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: model.tagColor,
                    fontWeight: 600,
                    backgroundColor: '#ffffff',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  {model.sampleImages[0]?.badge || 'Sample'}
                </span>
              </div>

              {model.sampleImages[0] && (
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    backgroundColor: '#0f172a'
                  }}
                  onClick={() =>
                    onSelectImage(
                      model.sampleImages[0].url,
                      model.sampleImages[0].title,
                      model.sampleImages[0].subtitle,
                      model.sampleImages[0].badge,
                      model.name
                    )
                  }
                >
                  <img
                    src={model.sampleImages[0].url}
                    alt={model.sampleImages[0].title}
                    style={{
                      width: '100%',
                      height: '220px',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '12px',
                      color: '#ffffff'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>{model.sampleImages[0].title}</span>
                      <Maximize2 size={16} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Deep Specs Comparison List */}
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Tensor Inputs & Outputs */}
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Tensor Dimensions & I/O
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ padding: '10px 12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>Generator In: </span>
                    <code style={{ fontFamily: 'var(--font-mono)', color: '#0f172a', fontSize: '12px' }}>
                      {model.generatorInput}
                    </code>
                  </div>
                  <div style={{ padding: '10px 12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>Generator Out: </span>
                    <code style={{ fontFamily: 'var(--font-mono)', color: '#0f172a', fontSize: '12px' }}>
                      {model.generatorOutput}
                    </code>
                  </div>
                  <div style={{ padding: '10px 12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>Discriminator In: </span>
                    <code style={{ fontFamily: 'var(--font-mono)', color: '#0f172a', fontSize: '12px' }}>
                      {model.discriminatorInput}
                    </code>
                  </div>
                  <div style={{ padding: '10px 12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>Discriminator Out: </span>
                    <code style={{ fontFamily: 'var(--font-mono)', color: '#0f172a', fontSize: '12px' }}>
                      {model.discriminatorOutput}
                    </code>
                  </div>
                </div>
              </div>

              {/* Mathematical Formulation */}
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Loss Formulation & MinMax Game
                </h4>
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: '#0f172a',
                    lineHeight: 1.6,
                    wordBreak: 'break-word'
                  }}
                >
                  {model.lossFormula}
                </div>
              </div>

              {/* Key Innovation */}
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Core Innovation
                </h4>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <Sparkles size={16} color={model.tagColor} style={{ marginTop: '3px', flexShrink: 0 }} />
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                    {model.keyInnovation}
                  </p>
                </div>
              </div>

              {/* Strengths & Limitations */}
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Empirical Findings
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {model.strengths.map((str, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '12px', color: '#166534' }}>
                      <Check size={14} color="#16a34a" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{str}</span>
                    </div>
                  ))}
                  {model.limitations.map((lim, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '12px', color: '#991b1b' }}>
                      <AlertCircle size={14} color="#dc2626" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{lim}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer Metrics */}
            <div
              style={{
                padding: '16px 24px',
                borderTop: '1px solid #f1f5f9',
                backgroundColor: '#fafbfc',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                  Convergence Speed
                </span>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '2px 0 0 0' }}>
                  {model.metrics.epochConvergence}
                </p>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                  Stability Index
                </span>
                <p style={{ fontSize: '14px', fontWeight: 700, color: model.tagColor, margin: '2px 0 0 0' }}>
                  {model.metrics.trainingStability}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
