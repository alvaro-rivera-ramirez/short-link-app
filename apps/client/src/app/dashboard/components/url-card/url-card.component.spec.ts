import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlCardComponent } from './url-card.component';

describe('UrlCardComponent', () => {
  let component: UrlCardComponent;
  let fixture: ComponentFixture<UrlCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrlCardComponent]
    });
    fixture = TestBed.createComponent(UrlCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
