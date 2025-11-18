import { signal, effect } from '@angular/core';
export function persistedSignal(key:string, initial:any){
  const stored = localStorage.getItem(key);
  const val = stored ? JSON.parse(stored) : initial;
  const s = signal(val);
  // keep localStorage in sync. This effect is read-only from outside.
  effect(()=> localStorage.setItem(key, JSON.stringify(s())));
  return s;
}
