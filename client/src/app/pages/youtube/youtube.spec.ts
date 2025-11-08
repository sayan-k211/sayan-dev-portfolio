import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Youtube } from './youtube';

describe('Youtube', () => {
  let component: Youtube;
  let fixture: ComponentFixture<Youtube>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Youtube]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Youtube);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
