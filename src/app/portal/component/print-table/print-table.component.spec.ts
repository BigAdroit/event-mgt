import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintTableComponent } from './print-table.component';

describe('PrintTableComponent', () => {
  let component: PrintTableComponent;
  let fixture: ComponentFixture<PrintTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintTableComponent]
    });
    fixture = TestBed.createComponent(PrintTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
