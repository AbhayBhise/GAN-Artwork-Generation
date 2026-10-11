import React from 'react'
import { Sparkles, Activity, Palette, BookOpen, GitCompare } from 'lucide-react'

interface HeaderProps {
  activeTab: 'comparison' | 'gallery' | 'architecture' | 'telemetry' | 'about' | 'dcgan' | 'cgan' | 'can'
  setActiveTab: (tab: 'comparison' | 'gallery' | 'architecture' | 'telemetry' | 'about' | 'dcgan' | 'cgan' | 'can') => void
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header
      style={{
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
      }}
    >
      {/* Top Banner with Project Context */}
      <div
        style={{
          borderBottom: '1px solid #f1f5f9',
          padding: '8px 32px',
          backgroundColor: '#fafbfc',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '12px',
          color: '#64748b'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontWeight: 600, color: '#334155' }}>
            Academic Research Project: Generative Adversarial Networks for Artwork Synthesis
          </span>
          <span style={{ color: '#cbd5e1' }}>|</span>
          <span>Implementation & Comparative Study: DCGAN vs cGAN</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <strong style={{ color: '#0f172a' }}>RTX 4050 GPU (CUDA 12.4)</strong>
          </span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span>22,632 WikiArt Works</span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <a
            href="https://huggingface.co/CBABHI/gan-artwork-generation"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              border: '1px solid #fde68a',
              borderRadius: '9999px',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '11px'
            }}
          >
            🤗 Hugging Face Models
          </a>
        </div>
      </div>

      {/* Main Masthead */}
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '24px 32px 16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#4f46e5',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)'
              }}
            >
              <Palette size={20} />
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '28px',
                fontWeight: 700,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                lineHeight: 1
              }}
            >
              Ars Adversaria
            </h1>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '4px 8px',
                backgroundColor: '#f1f5f9',
                color: '#475569',
                borderRadius: '6px',
                border: '1px solid #e2e8f0'
              }}
            >
              Synthesis Portal
            </span>
          </div>

          <p
            style={{
              fontSize: '14px',
              color: '#64748b',
              marginTop: '6px',
              maxWidth: '680px'
            }}
          >
            A comparative investigation into <strong>DCGAN</strong> (Unconditioned Convolutional Manifold), <strong>cGAN</strong> (27-Movement Conditioning), and <strong>CAN</strong> (Creative Style Deviation via Entropy).
          </p>
        </div>

        {/* Tab Navigation with Separate Dedicated Model Pages */}
        <nav
          style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '12px',
            gap: '4px',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={() => setActiveTab('comparison')}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: activeTab === 'comparison' ? '#ffffff' : 'transparent',
              color: activeTab === 'comparison' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'comparison' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <GitCompare size={15} color={activeTab === 'comparison' ? '#4f46e5' : '#64748b'} />
            Comparator
          </button>

          {/* Model Specific Pages */}
          <button
            onClick={() => setActiveTab('dcgan')}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: activeTab === 'dcgan' ? '#eef2ff' : 'transparent',
              color: activeTab === 'dcgan' ? '#4f46e5' : '#64748b',
              boxShadow: activeTab === 'dcgan' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              border: activeTab === 'dcgan' ? '1px solid #c7d2fe' : 'none'
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
            DCGAN Page
          </button>

          <button
            onClick={() => setActiveTab('cgan')}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: activeTab === 'cgan' ? '#ccfbf1' : 'transparent',
              color: activeTab === 'cgan' ? '#0d9488' : '#64748b',
              boxShadow: activeTab === 'cgan' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              border: activeTab === 'cgan' ? '1px solid #99f6e4' : 'none'
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#0d9488' }} />
            cGAN Page
          </button>

          <button
            onClick={() => setActiveTab('can')}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: activeTab === 'can' ? '#fef3c7' : 'transparent',
              color: activeTab === 'can' ? '#d97706' : '#64748b',
              boxShadow: activeTab === 'can' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              border: activeTab === 'can' ? '1px solid #fde68a' : 'none'
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
            CAN Page
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: activeTab === 'gallery' ? '#ffffff' : 'transparent',
              color: activeTab === 'gallery' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'gallery' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <Sparkles size={15} color={activeTab === 'gallery' ? '#4f46e5' : '#64748b'} />
            Evolution Scrubber
          </button>

          <button
            onClick={() => setActiveTab('telemetry')}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: activeTab === 'telemetry' ? '#ffffff' : 'transparent',
              color: activeTab === 'telemetry' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'telemetry' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <Activity size={15} color={activeTab === 'telemetry' ? '#10b981' : '#64748b'} />
            Telemetry
          </button>

          <button
            onClick={() => setActiveTab('about')}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: activeTab === 'about' ? '#ffffff' : 'transparent',
              color: activeTab === 'about' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'about' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <BookOpen size={15} color={activeTab === 'about' ? '#4f46e5' : '#64748b'} />
            Approach
          </button>
        </nav>
      </div>
    </header>
  )
}
