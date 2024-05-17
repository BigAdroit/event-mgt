import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleAdminComponent } from './raffle-admin.component';

describe('RaffleAdminComponent', () => {
  let component: RaffleAdminComponent;
  let fixture: ComponentFixture<RaffleAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaffleAdminComponent]
    });
    fixture = TestBed.createComponent(RaffleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
