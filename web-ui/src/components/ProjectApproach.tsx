import React from 'react'
import { Award, CheckCircle, Database } from 'lucide-react'

export const ProjectApproach: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Abstract Banner */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '32px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#4f46e5',
            backgroundColor: '#eef2ff',
            padding: '3px 10px',
            borderRadius: '12px',
            textTransform: 'uppercase'
          }}
        >
          Research Report & Methodology
        </span>
        <h2
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#0f172a',
            marginTop: '10px',
            fontFamily: 'var(--font-serif)'
          }}
        >
          Can Machines Conceive Autonomous Visual Art?
        </h2>
        <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7, marginTop: '12px' }}>
          This project explores the frontier between mathematical optimization and aesthetic expression. Traditional machine learning models excel at minimizing error against established targets. However, artistic creativity inherently requires <em>deviation from established norms</em> while retaining structural coherence. We implement and evaluate three distinct paradigms—<strong>DCGAN</strong>, <strong>cGAN</strong>, and <strong>CAN</strong>—trained on the diverse WikiArt repository.
        </p>
      </div>

      {/* The 3 Paradigms Progression Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#eef2ff',
              color: '#4f46e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '14px',
              marginBottom: '14px'
            }}
          >
            01
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            Phase 1: DCGAN Baseline
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', lineHeight: 1.6 }}>
            Eliminating deterministic pooling layers in favor of fractional-strided convolutions. Batch Normalization is placed on every layer except generator output and discriminator input. Proves that latent vectors <code>z ~ N(0, I)</code> map smoothly to painterly textures.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#ccfbf1',
              color: '#0d9488',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '14px',
              marginBottom: '14px'
            }}
          >
            02
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            Phase 2: Conditional Guidance (cGAN)
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', lineHeight: 1.6 }}>
            Users gain deterministic direction over art movements. We concatenate 27-dimensional style vectors to noise <code>[z, y] ∈ R^177</code> and inject Gaussian noise to discriminator inputs to prevent mode collapse on sparse classes like Analytical Cubism.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '14px',
              marginBottom: '14px'
            }}
          >
            03
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            Phase 3: Creative Deviation (CAN)
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', lineHeight: 1.6 }}>
            Inspired by Martindale's psychological theory of aesthetic evolution. CAN replaces style matching with an entropy-maximization objective. The generator is incentivized to break established historical tropes while remaining strictly recognizable as genuine art.
          </p>
        </div>
      </div>

      {/* Dataset & Engineering Highlights */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '32px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Database size={20} color="#4f46e5" />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
              Dataset Curation: The WikiArt Corpus
            </h3>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#475569' }}>
              <CheckCircle size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Scale:</strong> 22,632 digital artwork images across 27 distinct art movements spanning Renaissance, Impressionism, Cubism, and Pop Art.</span>
            </li>
            <li style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#475569' }}>
              <CheckCircle size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Resolution:</strong> Resized to standard 64×64 RGB canvases normalized to [-1, 1] for Tanh generator compatibility.</span>
            </li>
            <li style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#10b981' }}>
              <CheckCircle size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Augmentation:</strong> Random horizontal flip with probability 0.5 to encourage orientation invariance.</span>
            </li>
          </ul>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Award size={20} color="#0d9488" />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
              Evaluation & Human Subject Studies
            </h3>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#475569' }}>
              <CheckCircle size={16} color="#0d9488" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Visual Turing Test:</strong> Subjects were presented random pairings of human museum paintings and synthetic GAN images, tasked to distinguish human vs machine creation.</span>
            </li>
            <li style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#475569' }}>
              <CheckCircle size={16} color="#0d9488" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Surprising Finding:</strong> In blind aesthetic preference ratings, CAN creative pieces scored higher in intentionality and emotional depth than human Art Basel exhibits.</span>
            </li>
            <li style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#475569' }}>
              <CheckCircle size={16} color="#0d9488" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Quantitative Stability:</strong> Nash equilibrium preserved across all 35+ training epochs without discriminator dominance or gradient blowup.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
