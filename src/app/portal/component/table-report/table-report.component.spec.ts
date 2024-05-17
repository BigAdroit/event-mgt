import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReportComponent } from './table-report.component';

describe('TableReportComponent', () => {
  let component: TableReportComponent;
  let fixture: ComponentFixture<TableReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableReportComponent]
    });
    fixture = TestBed.createComponent(TableReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
