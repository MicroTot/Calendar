import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KabarnetComponent } from './kabarnet.component';

describe('KabarnetComponent', () => {
  let component: KabarnetComponent;
  let fixture: ComponentFixture<KabarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KabarnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KabarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
