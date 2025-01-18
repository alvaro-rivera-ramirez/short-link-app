import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlCardListComponent } from './url-card-list.component';

describe('UrlCardListComponent', () => {
  let component: UrlCardListComponent;
  let fixture: ComponentFixture<UrlCardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrlCardListComponent]
    });
    fixture = TestBed.createComponent(UrlCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
