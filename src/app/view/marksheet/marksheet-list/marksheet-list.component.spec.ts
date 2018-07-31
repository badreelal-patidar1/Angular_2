import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksheetListComponent } from './marksheet-list.component';

describe('MarksheetListComponent', () => {
  let component: MarksheetListComponent;
  let fixture: ComponentFixture<MarksheetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarksheetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
