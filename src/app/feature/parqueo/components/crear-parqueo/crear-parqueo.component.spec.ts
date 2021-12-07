import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearParqueoComponent } from './crear-parqueo.component';

describe('CrearParqueoComponent', () => {
  let component: CrearParqueoComponent;
  let fixture: ComponentFixture<CrearParqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearParqueoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
