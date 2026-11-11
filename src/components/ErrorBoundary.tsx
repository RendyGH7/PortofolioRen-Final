import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught application error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-midnight-0 text-pearl flex items-center justify-center p-6 selection:bg-champagne/30">
          <div className="max-w-md w-full glass-2 p-6 sm:p-8 rounded-3xl border border-champagne/40 text-center space-y-4 shadow-glass-lg">
            <div className="w-12 h-12 rounded-2xl bg-champagne/15 border border-champagne/40 flex items-center justify-center mx-auto text-champagne shadow-[0_0_20px_rgba(245,176,39,0.3)]">
              <AlertTriangle className="w-6 h-6 text-champagne" />
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold font-display text-pearl">
              Terjadi Kendala Tampilan
            </h1>
            
            <p className="text-xs sm:text-sm text-mist leading-relaxed">
              Sistem mendeteksi anomali pada pemuatan skrip eksternal atau browser. Silakan muat ulang halaman untuk melanjutkan.
            </p>

            <button
              type="button"
              onClick={this.handleReload}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-champagne text-midnight-0 text-xs sm:text-sm font-semibold hover:bg-champagne-light transition-all shadow-[0_0_20px_rgba(245,176,39,0.35)] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Muat Ulang Halaman</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
