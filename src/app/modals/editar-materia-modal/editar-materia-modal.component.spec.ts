import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMateriaModalComponent } from './editar-materia-modal.component';

describe('EditarMateriaModalComponent', () => {
  let component: EditarMateriaModalComponent;
  let fixture: ComponentFixture<EditarMateriaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarMateriaModalComponent]
    });
    fixture = TestBed.createComponent(EditarMateriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
