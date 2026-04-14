// Logger utility for development-only console output
// Automatically silences logs in production builds
//
// Usage:
//   import { log, debug, warn, error } from '@utils/logger';
//
//   log('Simple log');
//   debug('Analytics', 'Event tracked');
//   warn('Something might be wrong');
//   error('This always logs, even in production');
//
//   // Or import all:
//   import * as logger from '@utils/logger';
//   logger.log('Simple log');

const isDev = import.meta.env.DEV;

/**
 * Log helper that only outputs in development mode
 */
export const log = (...args: unknown[]) => {
  isDev && console.log(...args);
};

/**
 * Info log helper that only outputs in development mode
 */
export const info = (...args: unknown[]) => {
  isDev && console.info(...args);
};

/**
 * Warning log helper that only outputs in development mode
 */
export const warn = (...args: unknown[]) => {
  isDev && console.warn(...args);
};

/**
 * Error log helper - outputs in both dev and production
 * Errors should always be visible for debugging
 */
export const error = (...args: unknown[]) => {
  console.error(...args);
};

/**
 * Debug log helper with optional label
 */
export const debug = (label: string, ...args: unknown[]) => {
  isDev && console.log(`[${label}]`, ...args);
};

/**
 * Table log helper for structured data (dev only)
 */
export const table = (data: unknown) => {
  isDev && console.table(data);
};

/**
 * Group log helper for collapsible console groups (dev only)
 */
export const group = (label: string, fn: () => void) => {
  if (isDev) {
    console.group(label);
    fn();
    console.groupEnd();
  }
};

/**
 * Time measurement helper (dev only)
 */
export const time = (label: string) => {
  isDev && console.time(label);
};

export const timeEnd = (label: string) => {
  isDev && console.timeEnd(label);
};
