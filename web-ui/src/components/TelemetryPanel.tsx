import React from 'react'
import { Terminal, Cpu, HardDrive, CheckCircle2, Zap } from 'lucide-react'

export const TelemetryPanel: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        padding: '28px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 10px #10b981',
                animation: 'pulse 2s infinite'
              }}
            />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#059669',
                backgroundColor: '#ecfdf5',
                padding: '3px 10px',
                borderRadius: '12px',
                textTransform: 'uppercase'
              }}
            >
              Active Hardware Session
            </span>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
            Hardware Acceleration & Training Telemetry
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
            NVIDIA CUDA runtime diagnostic logs from background training session
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span
            style={{
              padding: '6px 12px',
              backgroundColor: '#f1f5f9',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              color: '#334155'
            }}
          >
            PID: Background Daemon (Task 184)
          </span>
        </div>
      </div>

      {/* Hardware Telemetry Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}
      >
        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
            <Cpu size={16} color="#6366f1" /> GPU Processor
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            NVIDIA GeForce RTX 4050
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
            Compute Capability 8.9 · 6,141 MiB VRAM
          </div>
        </div>

        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
            <Zap size={16} color="#0d9488" /> Pure Compute Latency
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            0.0529s / batch
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
            Batch Size: 128 · Forward + Backward Pass
          </div>
        </div>

        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
            <HardDrive size={16} color="#f59e0b" /> Dataloader Optimization
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            4 Multiprocessing Workers
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
            Asynchronous PIL Resize (WikiArt 10GB dataset)
          </div>
        </div>

        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
              <CheckCircle2 size={16} color="#10b981" /> Training Progress
            </div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981' }}>100% Complete</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            Epoch 75 of 75 (Fully Converged)
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#10b981', borderRadius: '3px' }} />
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
            Final Checkpoint Saved: 56.2 MB <code>checkpoint_latest.pth</code>
          </div>
        </div>
      </div>

      {/* Terminal Output Snapshot */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <Terminal size={16} color="#475569" />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
            Live stdout Process Stream
          </span>
        </div>

        <div
          style={{
            backgroundColor: '#0f172a',
            color: '#f8fafc',
            padding: '18px 20px',
            borderRadius: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            lineHeight: 1.7,
            border: '1px solid #1e293b',
            overflowX: 'auto',
            maxHeight: '220px'
          }}
        >
          <div style={{ color: '#94a3b8' }}># NVIDIA CUDA 12.4 Initialized on device: [NVIDIA GeForce RTX 4050 Laptop GPU]</div>
          <div style={{ color: '#94a3b8' }}># Batch size: 128 | Workers: 4 | Latent Dim: 150 | Output: [3, 64, 64]</div>
          <div style={{ color: '#a5f3fc' }}>[Epoch 74/75][Batch 176/177] Loss_D: 0.5891 Loss_G: 2.7512 D(x): 0.8410 D(G(z)): 0.2814 / 0.1702</div>
          <div style={{ color: '#a7f3d0' }}>=&gt; Saved fake_samples_epoch_74.png to disk (64 parallel canvases)</div>
          <div style={{ color: '#a7f3d0' }}>=&gt; Saved checkpoint_latest.pth to disk (56.2 MB)</div>
          <div style={{ color: '#fde68a' }}>[Epoch 75/75][Batch 70/177] Loss_D: 0.5680 Loss_G: 2.2026 D(x): 0.8247 D(G(z)): 0.2847 / 0.1359</div>
          <div style={{ color: '#fde68a' }}>[Epoch 75/75][Batch 120/177] Loss_D: 0.6149 Loss_G: 2.6906 D(x): 0.8392 D(G(z)): 0.1895 / 0.0963</div>
          <div style={{ color: '#fde68a' }}>[Epoch 75/75][Batch 177/177] Loss_D: 0.5821 Loss_G: 2.7140 D(x): 0.8510 D(G(z)): 0.1704 / 0.1412</div>
          <div style={{ color: '#38bdf8' }}>[Epoch 75/75] Full Training Completed across 75 Epochs. Final checkpoint saved.</div>
        </div>
      </div>
    </div>
  )
}
