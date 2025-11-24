import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimDemoComponent } from './anim-demo.component';

describe('AnimDemoComponent', () => {
  let component: AnimDemoComponent;
  let fixture: ComponentFixture<AnimDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
