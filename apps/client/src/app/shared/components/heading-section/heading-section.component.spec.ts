import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingSectionComponent } from './heading-section.component';

describe('HeadingSectionComponent', () => {
  let component: HeadingSectionComponent;
  let fixture: ComponentFixture<HeadingSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeadingSectionComponent]
    });
    fixture = TestBed.createComponent(HeadingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
