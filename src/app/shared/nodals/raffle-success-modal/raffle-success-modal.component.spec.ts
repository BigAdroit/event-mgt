import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleSuccessModalComponent } from './raffle-success-modal.component';

describe('RaffleSuccessModalComponent', () => {
  let component: RaffleSuccessModalComponent;
  let fixture: ComponentFixture<RaffleSuccessModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaffleSuccessModalComponent]
    });
    fixture = TestBed.createComponent(RaffleSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
