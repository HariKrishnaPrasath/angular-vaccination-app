import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVacsComponent } from './all-vacs.component';

describe('AllVacsComponent', () => {
  let component: AllVacsComponent;
  let fixture: ComponentFixture<AllVacsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllVacsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllVacsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
