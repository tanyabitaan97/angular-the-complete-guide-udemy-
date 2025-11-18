import { Component,HostBinding,HostListener,signal, Injector } from '@angular/core';
import { LOGGING_TOKEN } from '../logging.token';

@Component({
  selector:'app-host-demo',
  template:`<p>Clicks: {{ clicks() }}</p>`
})
export class HostDemoComponent{
  hovered = signal(false);
  clicks = signal(0);

  // host bindings using getters that read signals (safe with OnPush)
  @HostBinding('class.active') get active(){ return this.hovered(); }

  @HostListener('mouseenter') enter(){ this.hovered.set(true); }
  @HostListener('mouseleave') leave(){ this.hovered.set(false); }
  @HostListener('click') click(){
    this.clicks.update(v=>v+1);
    // Example of per-element injector usage:
    const elInjector = Injector.create({
      providers: [
        { provide: LOGGING_TOKEN, useValue: { log: (...a:any[])=> console.log('[EL-LOG]', ...a), warn: ()=>{}, error: ()=>{} } }
      ]
    });
    const logger = elInjector.get(LOGGING_TOKEN);
    logger.log('Element clicked, clicks=', this.clicks());
  }
}
