import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarParqueoComponent } from './editar-parqueo.component';

describe('EditarParqueoComponent', () => {
  let component: EditarParqueoComponent;
  let fixture: ComponentFixture<EditarParqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarParqueoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
