import { useState } from 'react'
import { Header } from './components/Header'
import { ModelComparisonTable } from './components/ModelComparisonTable'
import { InteractiveGallery } from './components/InteractiveGallery'
import { ArchitectureExplainer } from './components/ArchitectureExplainer'
import { TrainingLossChart } from './components/TrainingLossChart'
import { TelemetryPanel } from './components/TelemetryPanel'
import { ProjectApproach } from './components/ProjectApproach'
import { ImageModal } from './components/ImageModal'
import { ModelDetailPage } from './components/ModelDetailPage'
import { ExternalLink } from 'lucide-react'

export function App() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'gallery' | 'architecture' | 'telemetry' | 'about' | 'dcgan' | 'cgan' | 'can'>('comparison')
  const [modalData, setModalData] = useState<{
    isOpen: boolean
    src: string
    title: string
    subtitle: string
    badge: string
    modelName: string
  }>({
    isOpen: false,
    src: '',
    title: '',
    subtitle: '',
    badge: '',
    modelName: ''
  })

  const handleOpenImage = (
    src: string,
    title: string,
    subtitle: string,
    badge: string,
    modelName: string
  ) => {
    setModalData({
      isOpen: true,
      src,
      title,
      subtitle,
      badge,
      modelName
    })
  }

  const handleCloseImage = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      {/* Sticky Header with Masthead & Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main style={{ flex: 1, maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '32px' }}>
        {/* Dynamic Section Rendering */}
        {activeTab === 'comparison' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <ModelComparisonTable onSelectImage={handleOpenImage} />
            <TrainingLossChart />
          </div>
        )}

        {/* Dedicated DCGAN Page */}
        {activeTab === 'dcgan' && (
          <ModelDetailPage
            modelId="dcgan"
            onBack={() => setActiveTab('comparison')}
            onSelectImage={handleOpenImage}
          />
        )}

        {/* Dedicated cGAN Page */}
        {activeTab === 'cgan' && (
          <ModelDetailPage
            modelId="cgan"
            onBack={() => setActiveTab('comparison')}
            onSelectImage={handleOpenImage}
          />
        )}

        {/* Dedicated CAN Page */}
        {activeTab === 'can' && (
          <ModelDetailPage
            modelId="can"
            onBack={() => setActiveTab('comparison')}
            onSelectImage={handleOpenImage}
          />
        )}

        {activeTab === 'gallery' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <InteractiveGallery onSelectImage={handleOpenImage} />
            <TrainingLossChart />
          </div>
        )}

        {activeTab === 'architecture' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <ArchitectureExplainer />
            <TrainingLossChart />
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <TelemetryPanel />
            <TrainingLossChart />
          </div>
        )}

        {activeTab === 'about' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <ProjectApproach />
            <TelemetryPanel />
          </div>
        )}
      </main>

      {/* Light-Themed Editorial Footer */}
      <footer
        style={{
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          padding: '40px 32px 32px 32px',
          marginTop: 'auto'
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
              Ars Adversaria | Deep Generative Artwork Synthesis
            </h4>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
              Implementation & Comparative Investigation: DCGAN vs Conditional GAN (cGAN) vs Creative Adversarial Networks (CAN).
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '13px', color: '#475569' }}>
            <a
              href="https://arxiv.org/abs/1511.06434"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#475569' }}
            >
              DCGAN Paper <ExternalLink size={12} />
            </a>
            <a
              href="https://arxiv.org/abs/1411.1784"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#475569' }}
            >
              cGAN Paper <ExternalLink size={12} />
            </a>
            <a
              href="https://arxiv.org/abs/1706.07068"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#475569' }}
            >
              CAN Paper (Rutgers) <ExternalLink size={12} />
            </a>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontWeight: 600, color: '#059669' }}>GPU Accelerated: NVIDIA RTX 4050</span>
          </div>
        </div>
      </footer>

      {/* Global Image Lightbox Modal */}
      <ImageModal
        isOpen={modalData.isOpen}
        onClose={handleCloseImage}
        imageSrc={modalData.src}
        title={modalData.title}
        subtitle={modalData.subtitle}
        badge={modalData.badge}
        modelName={modalData.modelName}
      />
    </div>
  )
}

export default App
