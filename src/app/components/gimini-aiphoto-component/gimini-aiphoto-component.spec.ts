import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiminiAiphotoComponent } from './gimini-aiphoto-component';

describe('GiminiAiphotoComponent', () => {
  let component: GiminiAiphotoComponent;
  let fixture: ComponentFixture<GiminiAiphotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiminiAiphotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiminiAiphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
