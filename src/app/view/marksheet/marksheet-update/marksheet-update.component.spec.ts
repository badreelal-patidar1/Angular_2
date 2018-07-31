import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksheetUpdateComponent } from './marksheet-update.component';

describe('MarksheetUpdateComponent', () => {
  let component: MarksheetUpdateComponent;
  let fixture: ComponentFixture<MarksheetUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarksheetUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksheetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
