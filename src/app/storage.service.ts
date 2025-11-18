import { Injectable } from '@angular/core';
import { persistedSignal } from './persisted-signal';

@Injectable({providedIn:'root'})
export class StorageService{
  counter = persistedSignal('counter',0);
  increment(){ this.counter.update(v=>v+1); }
  reset(){ this.counter.set(0); }
}
