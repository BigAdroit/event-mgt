import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRecordsComponent } from './table-records.component';

describe('TableRecordsComponent', () => {
  let component: TableRecordsComponent;
  let fixture: ComponentFixture<TableRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableRecordsComponent]
    });
    fixture = TestBed.createComponent(TableRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
