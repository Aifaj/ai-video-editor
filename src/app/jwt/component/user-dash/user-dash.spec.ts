import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDash } from './user-dash';

describe('UserDash', () => {
  let component: UserDash;
  let fixture: ComponentFixture<UserDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDash);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
