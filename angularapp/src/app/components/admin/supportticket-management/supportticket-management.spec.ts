import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportticketManagement } from './supportticket-management';

describe('SupportticketManagement', () => {
  let component: SupportticketManagement;
  let fixture: ComponentFixture<SupportticketManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportticketManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportticketManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
