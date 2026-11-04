import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Activity,
} from 'lucide-react';

interface InteractiveArchitectureProps {
  lang: 'id' | 'en';
}

interface NodeDetail {
  id: string;
  name: string;
  category: string;
  latency: string;
  uptime: string;
  description: string;
  protocols: string[];
  specs: { label: string; value: string }[];
}

export const InteractiveArchitecture: React.FC<InteractiveArchitectureProps> = ({ lang }) => {
  const [activeNodeId, setActiveNodeId] = useState<string>('api');
  const [isSimulatingPacket, setIsSimulatingPacket] = useState(false);

  const nodes: NodeDetail[] = [
    {
      id: 'client',
      name: 'Client Viewport',
      category: 'Frontend Tier',
      latency: '<16ms (60fps)',
      uptime: '100%',
      description: 'Antarmuka React 19 terhidrasi dengan Three.js WebGL dan arsitektur Tailwind CSS tanpa layout shift.',
      protocols: ['HTTPS / HTTP/3', 'Wasm', 'WebGL 2.0'],
      specs: [
        { label: 'Core Web Vitals', value: 'LCP < 1.2s' },
        { label: 'Bundle Footprint', value: '< 165 KB' },
        { label: 'A11y Standard', value: 'WCAG 2.2 AA' },
      ],
    },
    {
      id: 'edge',
      name: 'Global Edge & CDN',
      category: 'Infrastruktur',
      latency: '12ms',
      uptime: '99.99%',
      description: 'Lapisan edge routing dengan proteksi DDoS, terminasi SSL otomatis, dan kompresi aset Brotli.',
      protocols: ['TLS 1.3', 'Anycast DNS', 'QUIC'],
      specs: [
        { label: 'Edge Nodes', value: '300+ Kota' },
        { label: 'Cache Hit Ratio', value: '94.2%' },
        { label: 'DDoS Mitigation', value: 'Active' },
      ],
    },
    {
      id: 'api',
      name: 'API Gateway & Core Logic',
      category: 'Backend Tier',
      latency: '38ms',
      uptime: '99.95%',
      description: 'Layanan micro-backend modular dengan validasi payload Zod, autentikasi sesi, dan rate limiter perlindungan spam.',
      protocols: ['RESTful JSON', 'JWT Session', 'HMAC Signatures'],
      specs: [
        { label: 'Concurrency', value: '1.200 req/s' },
        { label: 'Payload Validation', value: 'Zod Strict' },
        { label: 'Rate Limiting', value: '100 req/min' },
      ],
    },
    {
      id: 'database',
      name: 'PostgreSQL & Storage',
      category: 'Data Tier',
      latency: '8ms (Pool)',
      uptime: '99.99%',
      description: 'Database relasional terisolasi dengan connection pooler, indeks query teroptimasi, dan replikasi data aman.',
      protocols: ['PostgreSQL Wire', 'TLS Storage', 'AES-256'],
      specs: [
        { label: 'Query SLA', value: '< 15ms p95' },
        { label: 'Connection Pool', value: 'Prisma / PgBouncer' },
        { label: 'Snapshot Backup', value: 'Harian Otomatis' },
      ],
    },
    {
      id: 'worker',
      name: 'Async Dispatch Worker',
      category: 'Event Worker',
      latency: '24ms',
      uptime: '99.9%',
      description: 'Pemroses antrean latar belakang untuk verifikasi webhook, ekspor PDF, dan pengiriman notifikasi instan.',
      protocols: ['Webhook Hooks', 'Event Sinks', 'SMTP / REST'],
      specs: [
        { label: 'Delivery Guarantee', value: 'At-least-once' },
        { label: 'Retry Strategy', value: 'Exponential Backoff' },
        { label: 'Execution Timeout', value: '10 detik' },
      ],
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  const triggerPacketSimulation = () => {
    if (isSimulatingPacket) return;
    setIsSimulatingPacket(true);
    setTimeout(() => setIsSimulatingPacket(false), 2400);
  };

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 text-left">
        <div className="space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl font-normal">
            {lang === 'id' ? 'Arsitektur Sistem' : 'System Architecture'}
          </h2>
          <p className="text-mist text-xs sm:text-sm">
            {lang === 'id'
              ? 'Topologi end-to-end yang menjamin keandalan, keamanan, dan kecepatan data.'
              : 'End-to-end topology designed for resilience, security, and low latency.'}
          </p>
        </div>

        <button
          onClick={triggerPacketSimulation}
          disabled={isSimulatingPacket}
          className="w-fit px-3.5 py-2 rounded-md glass-2 hover:border-champagne/40 text-xs text-pearl flex items-center gap-2 transition-all font-mono self-start sm:self-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
        >
          <Activity className={`w-3.5 h-3.5 ${isSimulatingPacket ? 'animate-spin text-champagne' : 'text-sapphire'}`} />
          <span>{isSimulatingPacket ? 'Mengalirkan Paket...' : 'Simulasi Alur Data'}</span>
        </button>
      </div>

      {/* Main Interactive Diagram Board */}
      <div className="glass-2 rounded-2xl p-6 sm:p-8 space-y-8 relative overflow-hidden">
        {/* Node Selection Track */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 relative">
          {nodes.map((node, index) => {
            const isSelected = node.id === activeNodeId;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`p-4 rounded-xl text-left transition-all relative border ${
                  isSelected
                    ? 'glass-3 border-champagne/60 shadow-glass-md scale-[1.02]'
                    : 'glass-1 border-white/5 hover:border-white/20'
                }`}
              >
                {/* Node Status Dot */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-fog uppercase">
                    0{index + 1}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-champagne animate-pulse' : 'bg-status-success'
                    }`}
                  />
                </div>

                <div className="font-semibold text-xs text-pearl tracking-tight truncate">
                  {node.name}
                </div>
                <div className="text-[11px] text-mist mt-0.5">{node.category}</div>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-fog">
                  <span>SLA</span>
                  <span className="text-sapphire font-semibold">{node.latency}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card for Active Node with Smooth Fade In/Out */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="glass-1 rounded-xl p-6 border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 text-left items-center"
          >
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-champagne/15 text-champagne border border-champagne/25">
                  {activeNode.category}
                </span>
                <span className="text-xs text-fog font-mono">Uptime: {activeNode.uptime}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-pearl font-normal">
                {activeNode.name}
              </h3>

              <p className="text-xs text-mist leading-relaxed">{activeNode.description}</p>

              <div className="pt-2 flex flex-wrap gap-2">
                {activeNode.protocols.map((proto) => (
                  <span
                    key={proto}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-pearl flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3 h-3 text-status-success" />
                    <span>{proto}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 grid grid-cols-1 gap-2.5 bg-midnight-0/60 p-4 rounded-xl border border-white/5">
              <div className="text-[11px] font-mono text-fog uppercase tracking-wider pb-1 border-b border-white/5">
                Metrik & Konfigurasi
              </div>
              {activeNode.specs.map((spec) => (
                <div key={spec.label} className="flex items-center justify-between text-xs py-1">
                  <span className="text-mist">{spec.label}</span>
                  <span className="font-mono text-pearl font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
