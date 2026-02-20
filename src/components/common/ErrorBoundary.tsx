import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="panel max-w-md text-center">
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="mt-2 text-sm text-slate-500">Please refresh the page or contact support.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
