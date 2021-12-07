import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTarifaComponent } from './listar-tarifa.component';

describe('ListarTarifaComponent', () => {
  let component: ListarTarifaComponent;
  let fixture: ComponentFixture<ListarTarifaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTarifaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
