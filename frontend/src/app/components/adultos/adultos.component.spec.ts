import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultosComponent } from './adultos.component';

describe('AdultosComponent', () => {
  let component: AdultosComponent;
  let fixture: ComponentFixture<AdultosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdultosComponent]
    });
    fixture = TestBed.createComponent(AdultosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
