import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackTeamsComponent } from './track-teams.component';

describe('TrackTeamsComponent', () => {
  let component: TrackTeamsComponent;
  let fixture: ComponentFixture<TrackTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackTeamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
