import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVaccineComponent } from './create-vaccine.component';

describe('CreateVaccineComponent', () => {
  let component: CreateVaccineComponent;
  let fixture: ComponentFixture<CreateVaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVaccineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
