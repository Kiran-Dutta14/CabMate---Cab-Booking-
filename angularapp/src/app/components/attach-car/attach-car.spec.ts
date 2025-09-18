import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachCar } from './attach-car';

describe('AttachCar', () => {
  let component: AttachCar;
  let fixture: ComponentFixture<AttachCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachCar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachCar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
