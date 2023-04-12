import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HttpClientModule} from '@angular/common/http';
import { ApiService } from './services/api.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackTeamsComponent } from './components/track-teams/track-teams.component';
import { TeamGameResultsComponent } from './components/team-game-results/team-game-results.component'

@NgModule({
  declarations: [
    AppComponent,
    TrackTeamsComponent,
    TeamGameResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
