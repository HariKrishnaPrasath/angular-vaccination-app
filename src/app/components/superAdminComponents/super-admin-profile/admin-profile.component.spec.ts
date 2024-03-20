import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminProfileComponent } from './admin-profile.component';

describe('AdminProfileComponent', () => {
  let component: SuperAdminProfileComponent;
  let fixture: ComponentFixture<SuperAdminProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAdminProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
