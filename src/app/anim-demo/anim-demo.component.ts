import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group
} from '@angular/animations';

@Component({
  selector: 'app-anim-demo',
  templateUrl: './anim-demo.component.html',
  styleUrls: ['./anim-demo.component.css',
  ],
  animations: [

    // a) TRIGGER + STATES
    trigger('changeColor', [
      state('red', style({ backgroundColor: 'red', transform: 'scale(1)' })),
      state('green', style({ backgroundColor: 'green', transform: 'scale(1.2)' })),

      // c) BASIC TRANSITION
      transition('red => green', animate('1000ms ease-in')),
      transition('green => red', animate('800ms ease-out')),
    ]),

    // b) SWITCH BETWEEN STATES
    trigger('switchState', [
      state('small', style({ transform: 'scale(1)' })),
      state('large', style({ transform: 'scale(1.5)' })),
      transition('* <=> *', animate('500ms'))
    ]),

    // d) ADVANCED TRANSITIONS
    trigger('advancedTrans', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('700ms ease-in', style({ opacity: 1 }))
      ])
    ]),

    // e) TRANSITION PHASES (+ f) VOID STATE)
    trigger('enterLeave', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [       // f) VOID STATE
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('500ms ease-out')
      ]),
      transition('* => void', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateY(50px)' }))
      ])
    ]),

    // g) KEYFRAMES
    trigger('keyframeAnim', [
      transition('* => *', [
        animate('1500ms', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.2)', offset: 0.3 }),
          style({ transform: 'scale(0.8)', offset: 0.6 }),
          style({ transform: 'scale(1)', offset: 1 }),
        ]))
      ])
    ]),

    // h) GROUPING ANIMATIONS
    trigger('groupAnim', [
      transition('* => *', [
        group([
          animate('1000ms ease-in', style({ transform: 'translateX(50px)' })),
          animate('1000ms ease-out', style({ opacity: 0.5 }))
        ])
      ])
    ]),

    // i) ANIMATION CALLBACKS
    trigger('callbackAnim', [
      transition('* => triggered', [
        style({ opacity: 0 }),
        animate('800ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AnimDemoComponent {
  colorState = 'red';
  sizeState = 'small';
  callbackState = 'none';

  toggleColor() {
    this.colorState = this.colorState === 'red' ? 'green' : 'red';
  }

  toggleSize() {
    this.sizeState = this.sizeState === 'small' ? 'large' : 'small';
  }

  startCallback() {
    this.callbackState = 'triggered';
  }

  animationDone(event: any) {
    alert('Animation Finished! 🤩');
  }
}
