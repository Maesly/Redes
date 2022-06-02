import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhMainComponent } from './rh-main.component';

describe('RhMainComponent', () => {
  let component: RhMainComponent;
  let fixture: ComponentFixture<RhMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RhMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RhMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
