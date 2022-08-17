import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuniciplalitymasterComponent } from './municiplalitymaster.component';

describe('MuniciplalitymasterComponent', () => {
  let component: MuniciplalitymasterComponent;
  let fixture: ComponentFixture<MuniciplalitymasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuniciplalitymasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuniciplalitymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
