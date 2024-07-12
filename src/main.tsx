import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://eca5db58ce49f449f514711ad97da51a@o4507496262860800.ingest.us.sentry.io/4507496266661888',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    'localhost',
    /^https:\/\/yourserver\.io\/api/,
    /^https:\/\/vinylify-express.vercel.app/,
    // /^https:\/\/api.spotify.com/,
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
