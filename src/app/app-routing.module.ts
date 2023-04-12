import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackTeamsComponent } from './components/track-teams/track-teams.component';
import { TeamGameResultsComponent } from './components/team-game-results/team-game-results.component';

const routes: Routes = [
  {path:'teamSelect',component:TrackTeamsComponent},
  {path:'results/:teamCode',component:TeamGameResultsComponent},
  { path: '', redirectTo: 'teamSelect', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
