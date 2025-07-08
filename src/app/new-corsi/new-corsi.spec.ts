import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCorsi } from './new-corsi';

describe('NewCorsi', () => {
  let component: NewCorsi;
  let fixture: ComponentFixture<NewCorsi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCorsi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCorsi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
