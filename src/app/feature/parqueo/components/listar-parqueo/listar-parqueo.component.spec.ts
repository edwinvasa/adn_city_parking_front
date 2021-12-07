import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarParqueoComponent } from './listar-parqueo.component';

describe('ListarParqueoComponent', () => {
  let component: ListarParqueoComponent;
  let fixture: ComponentFixture<ListarParqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarParqueoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
