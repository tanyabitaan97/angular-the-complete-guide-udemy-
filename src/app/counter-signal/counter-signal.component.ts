import {
  Component,
  signal,
  computed,
  effect,
  isSignal,
} from '@angular/core';

import { untracked } from '@angular/core';

@Component({
  selector: 'app-counter-signal',
  templateUrl: './counter-signal.component.html',
})
export class CounterSignalComponent {
  count = signal(0);
  readonlyCount = this.count.asReadonly();

  doubleCount = computed(() => this.count() * 2);

  config = signal({ name: 'Tanya', skills: ['Angular'] });

  constructor() {
    effect((onCleanup) => {
      console.log('Count changed:', this.count());

      onCleanup(() => console.log('Effect removed'));
    });
  }


  increment() {
    this.count.update((c) => c + 1);
  }

addSkill() {
  this.config.update((c) => ({
    ...c,
    skills: [...c.skills, 'Signals']
  }));
}


logPeek() {
  const value = untracked(() => this.count());
  console.log(value);
}

  checkSignal() {
    console.log(isSignal(this.count));
  }
}
