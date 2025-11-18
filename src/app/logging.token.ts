import { InjectionToken } from '@angular/core';

export interface Logger {
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

export const LOGGING_TOKEN = new InjectionToken<Logger>('LOGGING_TOKEN');
