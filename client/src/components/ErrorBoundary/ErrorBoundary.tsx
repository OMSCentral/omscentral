import React from 'react';
import { Redirect } from 'react-router';
import * as sentry from '@sentry/browser';

import { paths } from 'src/constants';

interface State {
  error: boolean;
}

class ErrorBoundary extends React.Component<unknown, State> {
  state = { error: false };

  static getDerivedStateFromError = (): State => ({ error: true });

  componentDidCatch = (error: Error, errorInfo: React.ErrorInfo): void => {
    sentry.captureException(error, {
      level: sentry.Severity.Fatal,
      extra: {
        errorInfo,
      },
    });
  };

  render = (): React.ReactNode => {
    if (this.state.error) {
      return <Redirect to={paths.error(500)} />;
    }
    return this.props.children;
  };
}

export default ErrorBoundary;
