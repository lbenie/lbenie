// Microsoft Clarity Analytics Initialization
// This script runs on the client-side to initialize Clarity tracking

import clarity from '@microsoft/clarity';
import { debug, error as logError, warn } from '@utils/logger';

// Get Clarity Project ID from environment variable
// Set PUBLIC_CLARITY_PROJECT_ID in your .env file
const CLARITY_PROJECT_ID = import.meta.env.PUBLIC_CLARITY_PROJECT_ID;

// Initialize Clarity only if:
// 1. We're in the browser (not during SSR)
// 2. A valid project ID is configured
if (typeof window !== 'undefined' && CLARITY_PROJECT_ID) {
  try {
    clarity.init(CLARITY_PROJECT_ID);
    debug('Clarity', 'Analytics initialized successfully');
  } catch (err) {
    logError('[Clarity] Failed to initialize:', err);
  }
} else if (typeof window !== 'undefined' && !CLARITY_PROJECT_ID) {
  warn('[Clarity] Project ID not configured. Set PUBLIC_CLARITY_PROJECT_ID in your .env file.');
}

export default clarity;
