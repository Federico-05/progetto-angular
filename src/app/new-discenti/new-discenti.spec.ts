import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDiscenti } from './new-discenti';

describe('NewDiscenti', () => {
  let component: NewDiscenti;
  let fixture: ComponentFixture<NewDiscenti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDiscenti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDiscenti);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
