import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGanadoComponent } from './editar-ganado.component';

describe('EditarGanadoComponent', () => {
  let component: EditarGanadoComponent;
  let fixture: ComponentFixture<EditarGanadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarGanadoComponent]
    });
    fixture = TestBed.createComponent(EditarGanadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
