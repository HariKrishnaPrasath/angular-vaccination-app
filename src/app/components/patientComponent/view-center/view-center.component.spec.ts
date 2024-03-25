import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCenterComponent } from './view-center.component';

describe('ViewCenterComponent', () => {
  let component: ViewCenterComponent;
  let fixture: ComponentFixture<ViewCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
