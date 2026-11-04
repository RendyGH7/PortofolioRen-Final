import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Sliders,
  Send,
  Copy,
  Check,
  RotateCcw,
  Layers,
  Code2,
  Terminal,
} from 'lucide-react';
import { PERSONAL_DATA, HARD_SKILLS, PROJECTS } from '../data/portfolioData';

interface DevStudioSectionProps {
  lang: 'id' | 'en';
}

type StudioTab = 'api' | 'sql' | 'glass';

interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  summary: string;
  response: Record<string, unknown>;
  latencyMs: number;
}

export const DevStudioSection: React.FC<DevStudioSectionProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('api');

  // --- TAB 1: REST API EXPLORER STATE ---
  const endpoints: ApiEndpoint[] = [
    {
      id: 'profile',
      method: 'GET',
      path: '/api/v1/developer/profile',
      summary: lang === 'id' ? 'Data profil lengkap & status ketersediaan' : 'Full profile data & availability',
      latencyMs: 24,
      response: {
        status: 200,
        developer: {
          name: PERSONAL_DATA.name,
          role: PERSONAL_DATA.role,
          location: PERSONAL_DATA.location,
          status: PERSONAL_DATA.status.text,
          education: `${PERSONAL_DATA.education.school} (${PERSONAL_DATA.education.major})`,
        },
        verifiedSkills: {
          frontend: ['React 19', 'TypeScript', 'Tailwind CSS'],
          backend: ['Laravel (80%)', 'Python (82%)', 'Node.js (86%)', 'PHP (80%)'],
          database: ['PostgreSQL', 'MySQL', 'Relational Schema (85%)'],
          cloud: ['Linux Server', 'Routing & Switching', 'Cloud Mentor'],
        },
      },
    },
    {
      id: 'renstore',
      method: 'GET',
      path: '/api/v1/renstore/metrics',
      summary: lang === 'id' ? 'Metrik bisnis platform RenStore di Zeusx' : 'RenStore platform metrics on Zeusx',
      latencyMs: 38,
      response: {
        status: 200,
        platform: 'RenStore Global Commerce',
        marketplace: 'Zeusx Marketplace',
        metrics: {
          totalPositiveReviews: 1000,
          customerRating: '5.0 / 5.0',
          autoDispatchRate: '99.4%',
          transactionScope: 'International Digital Goods',
        },
        uptime: '99.98%',
      },
    },
    {
      id: 'tsdn',
      method: 'GET',
      path: '/api/v1/tsdn/predictive-model',
      summary: lang === 'id' ? 'Performa inferensi data sains TSDN 2024' : 'TSDN 2024 data science model performance',
      latencyMs: 31,
      response: {
        status: 200,
        competition: 'Turnamen Sains Data Nasional (TSDN)',
        issuer: 'Data Academy',
        achievement: 'Top 7 Nasional / Grand Finalist',
        modelArchitecture: 'Random Forest + XGBoost Ensemble',
        validationAccuracy: '94.2%',
        inferenceLatency: '14.8ms',
      },
    },
    {
      id: 'contact',
      method: 'POST',
      path: '/api/v1/contact/validate',
      summary: lang === 'id' ? 'Simulasi payload verifikasi formulir kontak' : 'Contact payload validation simulation',
      latencyMs: 42,
      response: {
        status: 200,
        message: 'Payload format validated successfully via Zod Schema',
        fields: {
          name: 'Verified (min 2 chars)',
          email: 'Verified (RFC 5322 regex)',
          message: 'Verified (min 10 chars)',
        },
        rateLimiterRemaining: '99/100 req/min',
      },
    },
  ];

  const [selectedEndpointId, setSelectedEndpointId] = useState<string>('profile');
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [apiResponseData, setApiResponseData] = useState<Record<string, unknown>>(endpoints[0].response);
  const [apiLatency, setApiLatency] = useState<number>(endpoints[0].latencyMs);
  const [copiedApi, setCopiedApi] = useState(false);

  const currentEndpoint = endpoints.find((e) => e.id === selectedEndpointId) || endpoints[0];

  const handleSendApi = (endpoint: ApiEndpoint) => {
    setIsSendingRequest(true);
    setTimeout(() => {
      setApiResponseData(endpoint.response);
      setApiLatency(endpoint.latencyMs + Math.floor(Math.random() * 8) - 4);
      setIsSendingRequest(false);
    }, 320);
  };

  const copyApiResponse = () => {
    navigator.clipboard.writeText(JSON.stringify(apiResponseData, null, 2));
    setCopiedApi(true);
    setTimeout(() => setCopiedApi(false), 2000);
  };

  // --- TAB 2: SQL QUERY RUNNER STATE ---
  const sqlPresets = [
    {
      id: 'q1',
      title: 'Top Skills (Level >= 80%)',
      query: `SELECT name, category, level \nFROM hard_skills \nWHERE level >= 80 \nORDER BY level DESC;`,
      headers: ['name', 'category', 'level'],
      rows: HARD_SKILLS.filter((s) => s.level >= 80).map((s) => [s.name, s.category, `${s.level}%`]),
      executionTime: '1.42ms',
    },
    {
      id: 'q2',
      title: 'Featured Projects & Metrics',
      query: `SELECT title, category, metrics_summary \nFROM production_projects \nWHERE status = 'Active';`,
      headers: ['title', 'category', 'metrics_summary'],
      rows: PROJECTS.map((p) => [p.title, p.category, p.metrics[0]?.value || 'Verified']),
      executionTime: '2.18ms',
    },
    {
      id: 'q3',
      title: 'Business Ventures & Awards',
      query: `SELECT venture_name, highlight, year \nFROM track_record \nORDER BY year DESC;`,
      headers: ['venture_name', 'highlight', 'year'],
      rows: [
        ['RenStore Zeusx', '1.000+ Ulasan Positif', '2025 - Sekarang'],
        ['TSDN Data Academy', 'Top 7 Grand Finalis Nasional', '2024'],
        ['PT Sollu Filantropi', 'Game & Web Developer', '2024'],
        ['SMKN 26 Jakarta', 'Cloud Computing Mentor', '2023 - 2027'],
      ],
      executionTime: '0.96ms',
    },
  ];

  const [selectedSqlIndex, setSelectedSqlIndex] = useState(0);
  const [isRunningSql, setIsRunningSql] = useState(false);
  const [activeSqlResult, setActiveSqlResult] = useState(sqlPresets[0]);

  const handleRunSql = (index: number) => {
    setIsRunningSql(true);
    setSelectedSqlIndex(index);
    setTimeout(() => {
      setActiveSqlResult(sqlPresets[index]);
      setIsRunningSql(false);
    }, 280);
  };

  // --- TAB 3: GLASS PHYSICS LAB STATE ---
  const [blurPx, setBlurPx] = useState(24);
  const [surfaceOpacity, setSurfaceOpacity] = useState(7);
  const [borderOpacity, setBorderOpacity] = useState(14);
  const [tintColor, setTintColor] = useState<'champagne' | 'sapphire' | 'petrol'>('champagne');
  const [copiedCss, setCopiedCss] = useState(false);

  const tintHexMap = {
    champagne: '#F5B027',
    sapphire: '#4C6FD1',
    petrol: '#2C7A85',
  };

  const generatedTailwind = `backdrop-blur-[${blurPx}px] bg-white/[0.0${surfaceOpacity}] border border-white/[0.${borderOpacity}] shadow-glass-md`;
  const generatedCss = `background: rgba(255, 255, 255, 0.0${surfaceOpacity});\nbackdrop-filter: blur(${blurPx}px);\nborder: 1px solid rgba(255, 255, 255, 0.${borderOpacity});\nbox-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);`;

  const copyCustomCss = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  };

  const resetGlassTokens = () => {
    setBlurPx(24);
    setSurfaceOpacity(7);
    setBorderOpacity(14);
    setTintColor('champagne');
  };

  return (
    <section id="studio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-left">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
            <span className="text-xs font-mono text-champagne uppercase tracking-wider">
              {lang === 'id' ? 'Laboratorium Interaktif' : 'Interactive Laboratory'}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-pearl font-normal">
            Dev Studio & Live Sandbox
          </h2>
          <p className="text-mist text-xs sm:text-sm max-w-xl">
            {lang === 'id'
              ? 'Uji langsung endpoint REST API, eksekusi engine query database SQL, dan eksplorasi token fisika Midnight Glass.'
              : 'Test live REST API endpoints, execute SQL database queries, and tweak Midnight Glass physics tokens in real time.'}
          </p>
        </div>

        {/* Studio Mode Selector Pills */}
        <div className="flex items-center gap-1 glass-1 p-1.5 rounded-full self-start md:self-auto">
          <button
            onClick={() => setActiveTab('api')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${
              activeTab === 'api'
                ? 'bg-champagne text-midnight-0 font-semibold shadow-sm'
                : 'text-mist hover:text-pearl'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>REST API</span>
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${
              activeTab === 'sql'
                ? 'bg-champagne text-midnight-0 font-semibold shadow-sm'
                : 'text-mist hover:text-pearl'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Database SQL</span>
          </button>
          <button
            onClick={() => setActiveTab('glass')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${
              activeTab === 'glass'
                ? 'bg-champagne text-midnight-0 font-semibold shadow-sm'
                : 'text-mist hover:text-pearl'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Glass Physics</span>
          </button>
        </div>
      </div>

      {/* Main Studio Console Window (Glass 2) */}
      <div className="glass-2 rounded-2xl border border-white/10 overflow-hidden shadow-glass-lg text-left">
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-midnight-1/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-status-error/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-status-warning/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-status-success/80 inline-block" />
            </div>
            <span className="text-xs font-mono text-fog ml-2">
              rendy-dev-studio :: {activeTab.toUpperCase()}_CONSOLE
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-mist">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse inline-block" />
            <span>Live Engine Ready</span>
          </div>
        </div>

        {/* Tab 1: REST API Explorer */}
        <AnimatePresence mode="wait">
          {activeTab === 'api' && (
            <motion.div
              key="studio-api"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 sm:p-7 space-y-6"
            >
              {/* Endpoint Selector Bar */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex-1 glass-1 rounded-xl p-2.5 flex items-center gap-2 border border-white/10">
                    <span
                      className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded ${
                        currentEndpoint.method === 'GET'
                          ? 'bg-status-success/15 text-status-success border border-status-success/30'
                          : 'bg-sapphire/20 text-sapphire border border-sapphire/30'
                      }`}
                    >
                      {currentEndpoint.method}
                    </span>
                    <select
                      value={selectedEndpointId}
                      onChange={(e) => {
                        const nextId = e.target.value;
                        setSelectedEndpointId(nextId);
                        const found = endpoints.find((ep) => ep.id === nextId);
                        if (found) handleSendApi(found);
                      }}
                      className="bg-transparent text-xs font-mono text-pearl flex-1 focus:outline-none cursor-pointer"
                      aria-label="Pilih Endpoint API"
                    >
                      {endpoints.map((ep) => (
                        <option key={ep.id} value={ep.id} className="bg-midnight-1 text-pearl">
                          {ep.path}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => handleSendApi(currentEndpoint)}
                    disabled={isSendingRequest}
                    className="btn-champagne px-5 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                  >
                    {isSendingRequest ? (
                      <div className="w-4 h-4 border-2 border-midnight-0 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 text-midnight-0" />
                    )}
                    <span>{lang === 'id' ? 'Kirim Request' : 'Send Request'}</span>
                  </button>
                </div>

                <div className="md:col-span-4 glass-1 p-2.5 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                  <span className="text-fog font-mono">{lang === 'id' ? 'Deskripsi' : 'Summary'}:</span>
                  <span className="text-mist truncate ml-2 text-right">{currentEndpoint.summary}</span>
                </div>
              </div>

              {/* Response Stats Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-1 border-b border-white/5 text-xs font-mono">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-status-success">
                    <span className="w-2 h-2 rounded-full bg-status-success" />
                    <span>Status: 200 OK</span>
                  </span>
                  <span className="text-mist">
                    Latensi:{' '}
                    <span className="text-champagne font-semibold">{apiLatency}ms</span>
                  </span>
                  <span className="text-fog hidden sm:inline">Format: application/json</span>
                </div>

                <button
                  onClick={copyApiResponse}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-xs text-mist hover:text-pearl transition-colors"
                >
                  {copiedApi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-status-success" />
                      <span className="text-status-success">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin JSON</span>
                    </>
                  )}
                </button>
              </div>

              {/* JSON Response Code Box */}
              <div className="relative rounded-xl bg-midnight-0/95 border border-white/10 p-4 sm:p-5 font-mono text-xs overflow-x-auto max-h-[380px]">
                <pre className="text-champagne/90 leading-relaxed">
                  {JSON.stringify(apiResponseData, null, 2)}
                </pre>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Database SQL Query Engine */}
          {activeTab === 'sql' && (
            <motion.div
              key="studio-sql"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 sm:p-7 space-y-6"
            >
              {/* Presets Strip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-fog mr-1">Query Preset:</span>
                {sqlPresets.map((preset, idx) => (
                  <button
                    key={preset.id}
                    onClick={() => handleRunSql(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                      selectedSqlIndex === idx
                        ? 'bg-sapphire/20 border-sapphire/50 text-pearl font-semibold'
                        : 'glass-1 border-white/5 text-mist hover:text-pearl'
                    }`}
                  >
                    {preset.title}
                  </button>
                ))}
              </div>

              {/* SQL Code Editor Box */}
              <div className="rounded-xl bg-midnight-0/95 border border-white/10 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-fog border-b border-white/5 pb-2">
                  <span className="font-mono flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-champagne" />
                    <span>postgresql_engine :: rendy_portfolio_db</span>
                  </span>
                  <button
                    onClick={() => handleRunSql(selectedSqlIndex)}
                    disabled={isRunningSql}
                    className="btn-champagne px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5"
                  >
                    {isRunningSql ? (
                      <div className="w-3 h-3 border-2 border-midnight-0 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Terminal className="w-3 h-3 text-midnight-0" />
                    )}
                    <span>Jalankan SQL</span>
                  </button>
                </div>

                <div className="font-mono text-xs text-pearl whitespace-pre leading-relaxed pl-2 border-l-2 border-champagne">
                  {sqlPresets[selectedSqlIndex].query}
                </div>
              </div>

              {/* Query Result Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-fog">
                  <span>
                    Hasil Query ({activeSqlResult.rows.length} baris data)
                  </span>
                  <span className="text-status-success">
                    Execution Time: {activeSqlResult.executionTime}
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10 glass-1">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-white/5 text-champagne font-mono text-[11px] uppercase border-b border-white/10">
                      <tr>
                        {activeSqlResult.headers.map((h) => (
                          <th key={h} className="p-3 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-mist font-mono">
                      {activeSqlResult.rows.map((row, i) => (
                        <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                          {row.map((val, cellIdx) => (
                            <td key={cellIdx} className="p-3 text-pearl/90">
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Glassmorphism UI Physics Lab */}
          {activeTab === 'glass' && (
            <motion.div
              key="studio-glass"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 sm:p-7 space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Sliders Controls Column */}
                <div className="lg:col-span-5 space-y-5 glass-1 p-5 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-xs font-semibold text-pearl flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-champagne" />
                      <span>Parameter Fisika Kaca</span>
                    </span>
                    <button
                      onClick={resetGlassTokens}
                      className="p-1 rounded text-fog hover:text-pearl transition-colors"
                      title="Reset Default"
                      aria-label="Reset Token Kaca"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Slider: Blur */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-mist">Backdrop Blur</span>
                      <span className="font-mono text-champagne font-semibold">{blurPx}px</span>
                    </div>
                    <input
                      type="range"
                      min={8}
                      max={48}
                      value={blurPx}
                      onChange={(e) => setBlurPx(Number(e.target.value))}
                      className="w-full accent-champagne cursor-pointer h-1.5 bg-white/10 rounded-lg"
                      aria-label="Backdrop Blur"
                    />
                  </div>

                  {/* Slider: Opacity */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-mist">Surface Opacity</span>
                      <span className="font-mono text-champagne font-semibold">{surfaceOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={25}
                      value={surfaceOpacity}
                      onChange={(e) => setSurfaceOpacity(Number(e.target.value))}
                      className="w-full accent-champagne cursor-pointer h-1.5 bg-white/10 rounded-lg"
                      aria-label="Surface Opacity"
                    />
                  </div>

                  {/* Slider: Border Highlight */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-mist">Border Highlight</span>
                      <span className="font-mono text-champagne font-semibold">{borderOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min={6}
                      max={35}
                      value={borderOpacity}
                      onChange={(e) => setBorderOpacity(Number(e.target.value))}
                      className="w-full accent-champagne cursor-pointer h-1.5 bg-white/10 rounded-lg"
                      aria-label="Border Highlight"
                    />
                  </div>

                  {/* Accent Glow Tint */}
                  <div className="space-y-2 pt-1 border-t border-white/5">
                    <span className="text-xs text-mist block">Aksen Refraksi Cahaya:</span>
                    <div className="flex gap-2">
                      {(['champagne', 'sapphire', 'petrol'] as const).map((colorKey) => (
                        <button
                          key={colorKey}
                          onClick={() => setTintColor(colorKey)}
                          className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono capitalize transition-all border ${
                            tintColor === colorKey
                              ? 'border-white/50 shadow-sm font-semibold text-pearl'
                              : 'border-white/5 text-fog hover:text-pearl'
                          }`}
                          style={{
                            backgroundColor:
                              tintColor === colorKey
                                ? `${tintHexMap[colorKey]}25`
                                : 'transparent',
                          }}
                        >
                          {colorKey}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Preview Canvas & Code Generator Column */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Visual Preview Box with Colorful Gradient Blobs */}
                  <div className="relative rounded-2xl h-[210px] flex items-center justify-center overflow-hidden border border-white/10 p-6 bg-midnight-0">
                    {/* Underlying Glow Blobs to demonstrate real glass refraction */}
                    <div
                      className="absolute w-36 h-36 rounded-full blur-[40px] pointer-events-none -top-6 -left-6"
                      style={{ backgroundColor: `${tintHexMap[tintColor]}40` }}
                    />
                    <div className="absolute w-40 h-40 rounded-full blur-[45px] pointer-events-none -bottom-8 -right-8 bg-sapphire/30" />

                    {/* The Live Glass Card with dynamic inline styles */}
                    <div
                      className="relative z-10 w-full max-w-sm rounded-xl p-5 text-left transition-all duration-150"
                      style={{
                        backdropFilter: `blur(${blurPx}px)`,
                        WebkitBackdropFilter: `blur(${blurPx}px)`,
                        backgroundColor: `rgba(255, 255, 255, ${surfaceOpacity / 100})`,
                        border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
                        boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 20px -5px ${tintHexMap[tintColor]}20`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${tintHexMap[tintColor]}20`,
                            color: tintHexMap[tintColor],
                            border: `1px solid ${tintHexMap[tintColor]}40`,
                          }}
                        >
                          Live Glass Card
                        </span>
                        <Layers className="w-3.5 h-3.5" style={{ color: tintHexMap[tintColor] }} />
                      </div>
                      <p className="text-sm font-semibold text-pearl">Midnight Glass Physics</p>
                      <p className="text-xs text-mist mt-0.5">
                        Refraksi waktu nyata dengan dynamic backdrop filter.
                      </p>
                    </div>
                  </div>

                  {/* Generated Tailwind & CSS Box with Copy */}
                  <div className="glass-1 p-4 rounded-xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-fog">
                      <span className="font-mono flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-champagne" />
                        <span>Tailwind & CSS Tokens</span>
                      </span>
                      <button
                        onClick={copyCustomCss}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs text-mist hover:text-pearl font-mono transition-colors"
                      >
                        {copiedCss ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-status-success" />
                            <span className="text-status-success">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin CSS</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="rounded-lg bg-midnight-0/95 border border-white/10 p-3 font-mono text-[11px] text-champagne overflow-x-auto">
                      <code>{generatedTailwind}</code>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

