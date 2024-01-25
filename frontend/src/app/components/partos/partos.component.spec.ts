import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartosComponent } from './partos.component';

describe('PartosComponent', () => {
  let component: PartosComponent;
  let fixture: ComponentFixture<PartosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartosComponent]
    });
    fixture = TestBed.createComponent(PartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
