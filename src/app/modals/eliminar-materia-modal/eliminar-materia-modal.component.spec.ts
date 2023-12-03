import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarMateriaModalComponent } from './eliminar-materia-modal.component';

describe('EliminarMateriaModalComponent', () => {
  let component: EliminarMateriaModalComponent;
  let fixture: ComponentFixture<EliminarMateriaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarMateriaModalComponent]
    });
    fixture = TestBed.createComponent(EliminarMateriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
