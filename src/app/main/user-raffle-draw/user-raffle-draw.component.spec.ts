import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRaffleDrawComponent } from './user-raffle-draw.component';

describe('UserRaffleDrawComponent', () => {
  let component: UserRaffleDrawComponent;
  let fixture: ComponentFixture<UserRaffleDrawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRaffleDrawComponent]
    });
    fixture = TestBed.createComponent(UserRaffleDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
