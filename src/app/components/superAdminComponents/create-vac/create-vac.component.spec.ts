import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVacComponent } from './create-vac.component';

describe('CreateVacComponent', () => {
  let component: CreateVacComponent;
  let fixture: ComponentFixture<CreateVacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVacComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateVacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
