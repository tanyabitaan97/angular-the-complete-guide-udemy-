import { Component,ViewChild,ContentChild,ElementRef,AfterViewInit,AfterContentInit,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector:'app-content-view-demo',
  templateUrl:'./content-view-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentViewDemoComponent implements AfterViewInit, AfterContentInit{
  @ViewChild('localRef', { read: ElementRef, static: false }) localRef?: ElementRef;
  @ContentChild('projectedParagraph', { read: ElementRef, static: false }) projectedParagraph?: ElementRef;

  // Avoid mutating bound values inside these hooks to prevent NG0100.
  ngAfterContentInit(){
    // safe read-only operations only
    console.log('projected paragraph?', !!this.projectedParagraph);
  }

  ngAfterViewInit(){
    // If you must change component state here, do it inside a microtask or via ngZone.run
    // but better to use signals and update outside of change detection if appropriate.
    if(this.localRef){
      // read-only DOM work
      console.log('view init localRef available');
    }
  }
}
