import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterTablesComponent } from './voter-tables.component';

describe('VoterTablesComponent', () => {
  let component: VoterTablesComponent;
  let fixture: ComponentFixture<VoterTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoterTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
