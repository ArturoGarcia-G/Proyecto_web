import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroScreenComponent } from './registro-screen.component';

describe('RegistroScreenComponent', () => {
  let component: RegistroScreenComponent;
  let fixture: ComponentFixture<RegistroScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});