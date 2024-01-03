import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecerrosComponent } from './becerros.component';

describe('BecerrosComponent', () => {
  let component: BecerrosComponent;
  let fixture: ComponentFixture<BecerrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BecerrosComponent]
    });
    fixture = TestBed.createComponent(BecerrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
