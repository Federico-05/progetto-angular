import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDocenti } from './new-docenti';

describe('NewDocenti', () => {
  let component: NewDocenti;
  let fixture: ComponentFixture<NewDocenti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDocenti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDocenti);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
