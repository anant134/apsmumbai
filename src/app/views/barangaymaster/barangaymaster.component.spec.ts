import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangaymasterComponent } from './barangaymaster.component';

describe('BarangaymasterComponent', () => {
  let component: BarangaymasterComponent;
  let fixture: ComponentFixture<BarangaymasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarangaymasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangaymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
