import React, { Component, ReactNode } from "react";
import { Alert, Button, Spin } from "antd";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Remote app error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload(); // Reload lại trang để thử tải lại module
  };

  render() {
    if (this.state.hasError) {
      return (
        <Alert
          message="Remote App Error"
          description="The remote application failed to load. Please check your connection and try again."
          type="error"
          showIcon
          action={
            <Button type="primary" onClick={this.handleRetry}>
              Retry
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
