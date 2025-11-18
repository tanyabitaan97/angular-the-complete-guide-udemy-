import { Injectable } from '@angular/core';
import { Logger } from './logging.token';

@Injectable()
export class ConsoleLoggingService implements Logger {
  log(...args: any[]) { console.log('[LOG]', ...args); }
  warn(...args: any[]) { console.warn('[WARN]', ...args); }
  error(...args: any[]) { console.error('[ERR]', ...args); }
}
