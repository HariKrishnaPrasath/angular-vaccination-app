import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVacComponent } from './update-vac.component';

describe('UpdateVacComponent', () => {
  let component: UpdateVacComponent;
  let fixture: ComponentFixture<UpdateVacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateVacComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateVacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
