import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVaccinesComponent } from './all-vaccines.component';

describe('AllVaccinesComponent', () => {
  let component: AllVaccinesComponent;
  let fixture: ComponentFixture<AllVaccinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllVaccinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllVaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
