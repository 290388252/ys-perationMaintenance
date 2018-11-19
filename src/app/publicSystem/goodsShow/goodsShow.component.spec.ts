import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsShowComponent } from './goodsShow.component';

describe('DetailComponent', () => {
  let component: GoodsShowComponent;
  let fixture: ComponentFixture<GoodsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
