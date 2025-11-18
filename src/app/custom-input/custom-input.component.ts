import { Component,Input,Output,EventEmitter,ChangeDetectionStrategy,signal,computed } from '@angular/core';

@Component({
  selector:'app-custom-input',
  templateUrl:'./custom-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomInputComponent{
  private _model = signal('');
  @Input() set model(v:string){ this._model.set(v); }
  @Output() modelChange = new EventEmitter<string>();
  trimmed = computed(()=> this._model().trim());
  value = this._model;
  onInput(v:string){ this._model.set(v); this.modelChange.emit(v); }
}
