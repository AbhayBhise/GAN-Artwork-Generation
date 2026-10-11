import React, { useState } from 'react'
import { GAN_MODELS } from '../data/modelsData'
import type { ModelArchitecture } from '../data/modelsData'
import { 
  ArrowLeft, ExternalLink, Sparkles, CheckCircle2, 
  Sigma, ShieldAlert, Maximize2
} from 'lucide-react'

interface ModelDetailPageProps {
  modelId: string
  onBack: () => void
  onSelectImage: (src: string, title: string, subtitle: string, badge: string, modelName: string) => void
}

export const ModelDetailPage: React.FC<ModelDetailPageProps> = ({ modelId, onBack, onSelectImage }) => {
  const model: ModelArchitecture = GAN_MODELS.find(m => m.id === modelId) || GAN_MODELS[0]
  const [activeTab, setActiveTab] = useState<'overview' | 'outputs' | 'architecture' | 'graphs'>('overview')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Breadcrumb & Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#334155',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} /> Back to All Models
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: model.accentColor,
              color: model.tagColor,
              border: `1px solid ${model.tagColor}30`
            }}
          >
            {model.status}
          </span>
          <a
            href={model.paperUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#475569'
            }}
          >
            Read Original Paper <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Hero Header Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: `1px solid ${model.tagColor}30`,
          padding: '36px',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            backgroundColor: model.tagColor
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '850px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: model.tagColor,
                  letterSpacing: '0.05em'
                }}
              >
                Comprehensive Model Dossier
              </span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ fontSize: '13px', color: '#64748b' }}>{model.paperRef}</span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '32px',
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.2
              }}
            >
              {model.fullName} ({model.name})
            </h1>

            <p style={{ fontSize: '15px', color: '#475569', marginTop: '12px', lineHeight: 1.6 }}>
              {model.description}
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              minWidth: '260px',
              backgroundColor: '#f8fafc',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0'
            }}
          >
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                Discriminator Loss
              </span>
              <p style={{ fontSize: '16px', fontWeight: 800, color: '#0d9488', margin: '2px 0 0 0' }}>
                {model.metrics.lossD}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                Generator Loss
              </span>
              <p style={{ fontSize: '16px', fontWeight: 800, color: '#6366f1', margin: '2px 0 0 0' }}>
                {model.metrics.lossG}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                Epochs Trained
              </span>
              <p style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                {model.epochsTrained} Epochs
              </p>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                Training Stability
              </span>
              <p style={{ fontSize: '16px', fontWeight: 800, color: '#10b981', margin: '2px 0 0 0' }}>
                {model.metrics.trainingStability}
              </p>
            </div>
          </div>
        </div>

        {/* Inner Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '28px',
            borderTop: '1px solid #f1f5f9',
            paddingTop: '20px'
          }}
        >
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '8px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              backgroundColor: activeTab === 'overview' ? model.accentColor : '#f8fafc',
              color: activeTab === 'overview' ? model.tagColor : '#475569',
              border: activeTab === 'overview' ? `1px solid ${model.tagColor}50` : '1px solid #e2e8f0',
              cursor: 'pointer'
            }}
          >
            Overview & Key Innovation
          </button>
          <button
            onClick={() => setActiveTab('outputs')}
            style={{
              padding: '8px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              backgroundColor: activeTab === 'outputs' ? model.accentColor : '#f8fafc',
              color: activeTab === 'outputs' ? model.tagColor : '#475569',
              border: activeTab === 'outputs' ? `1px solid ${model.tagColor}50` : '1px solid #e2e8f0',
              cursor: 'pointer'
            }}
          >
            Generated Outputs & Visual Gallery ({model.sampleImages.length})
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            style={{
              padding: '8px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              backgroundColor: activeTab === 'architecture' ? model.accentColor : '#f8fafc',
              color: activeTab === 'architecture' ? model.tagColor : '#475569',
              border: activeTab === 'architecture' ? `1px solid ${model.tagColor}50` : '1px solid #e2e8f0',
              cursor: 'pointer'
            }}
          >
            Mathematical Formulation & I/O Tensors
          </button>
          <button
            onClick={() => setActiveTab('graphs')}
            style={{
              padding: '8px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              backgroundColor: activeTab === 'graphs' ? model.accentColor : '#f8fafc',
              color: activeTab === 'graphs' ? model.tagColor : '#475569',
              border: activeTab === 'graphs' ? `1px solid ${model.tagColor}50` : '1px solid #e2e8f0',
              cursor: 'pointer'
            }}
          >
            Convergence Curves & Graphs
          </button>
        </div>
      </div>

      {/* Tab 1: Overview & Strengths/Limitations */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          {/* Key Innovation Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '28px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sparkles size={18} color={model.tagColor} />
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                Key Innovation & Breakthrough
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
              {model.keyInnovation}
            </p>

            <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Training Objective
              </span>
              <p style={{ fontSize: '13px', color: '#1e293b', marginTop: '4px', lineHeight: 1.5 }}>
                {model.objective}
              </p>
            </div>
          </div>

          {/* Strengths & Limitations */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '28px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <CheckCircle2 size={16} /> Architectural Strengths
              </h4>
              <ul style={{ paddingLeft: '20px', fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                {model.strengths.map((s, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <ShieldAlert size={16} /> Known Limitations & Failure Modes
              </h4>
              <ul style={{ paddingLeft: '20px', fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                {model.limitations.map((l, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Outputs & High-Res Gallery */}
      {activeTab === 'outputs' && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '28px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
              High-Fidelity Visual Outputs for {model.name}
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              Inspect generated canvases, comparative grids, and multi-class batch synthesis outputs.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}
          >
            {model.sampleImages.map((img, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#0a0f1d',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}
                onClick={() =>
                  onSelectImage(img.url, img.title, img.subtitle, img.badge, model.name)
                }
              >
                <div style={{ position: 'relative', height: '260px' }}>
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: '#ffffff',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Maximize2 size={12} /> {img.badge}
                  </div>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                    {img.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    {img.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Mathematical Formulation & Tensor I/O */}
      {activeTab === 'architecture' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Math formulation */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '28px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sigma size={18} color="#6366f1" />
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                Mathematical Objective & Loss Function
              </h3>
            </div>
            <div
              style={{
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: '#334155',
                overflowX: 'auto'
              }}
            >
              {model.lossFormula}
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '10px' }}>
              Loss formulation: <strong>{model.lossFunction}</strong>
            </p>
          </div>

          {/* Tensor Dimensions Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px'
            }}
          >
            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Generator Input Vector
              </span>
              <p style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0f172a', marginTop: '6px' }}>
                {model.generatorInput}
              </p>
            </div>

            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Generator Output Tensor
              </span>
              <p style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0f172a', marginTop: '6px' }}>
                {model.generatorOutput}
              </p>
            </div>

            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Discriminator Input
              </span>
              <p style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0f172a', marginTop: '6px' }}>
                {model.discriminatorInput}
              </p>
            </div>

            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Discriminator Prediction
              </span>
              <p style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0f172a', marginTop: '6px' }}>
                {model.discriminatorOutput}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Convergence Curves & Graphs */}
      {activeTab === 'graphs' && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '28px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
              Empirical Training Curves & Convergence for {model.name}
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              Observed Nash equilibrium, loss trajectories, and discriminator accuracy across epochs.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              border: '1px solid #e2e8f0'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>D-Loss Range</span>
                <p style={{ fontSize: '18px', fontWeight: 800, color: '#0d9488', marginTop: '2px' }}>{model.metrics.lossD}</p>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>G-Loss Range</span>
                <p style={{ fontSize: '18px', fontWeight: 800, color: '#6366f1', marginTop: '2px' }}>{model.metrics.lossG}</p>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Epoch Convergence</span>
                <p style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>{model.metrics.epochConvergence}</p>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Stability Rating</span>
                <p style={{ fontSize: '18px', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>{model.metrics.trainingStability}</p>
              </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Convergence Dynamics Analysis
              </h4>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                During training on WikiArt (batch size {model.batchSize}), the generator and discriminator converged at approximately {model.metrics.epochConvergence}. The discriminator error maintained an optimal non-saturating gradient without mode collapse, allowing the generator to capture high-frequency brushstroke impasto across all 27 art historical movements.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
