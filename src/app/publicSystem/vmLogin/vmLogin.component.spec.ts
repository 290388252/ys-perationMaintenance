import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmLoginComponent } from './vmLogin.component';

describe('VmLoginComponent', () => {
  let component: VmLoginComponent;
  let fixture: ComponentFixture<VmLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
