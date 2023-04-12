import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {TeamCard} from 'src/app/models/models';

@Component({
  selector: 'app-team-game-results',
  templateUrl: './team-game-results.component.html',
  styleUrls: ['./team-game-results.component.css']
})
export class TeamGameResultsComponent implements OnInit {

  teamId:string=""
  name:string=""
  conference:string=""
  gameResults:TeamCard[]=[]
  abbrevation:string=""
  constructor(
    private route: ActivatedRoute,
    private api:ApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.teamId = params.get('teamCode')!;
     });
     this.name = sessionStorage.getItem("name")!
     this.conference = sessionStorage.getItem("conference")!
     this.abbrevation = sessionStorage.getItem("abbrevation")!
     this.getGameResults()
  }

  getGameResults():void{
    this.api.getLast12Days(this.teamId).subscribe({
      next:(response)=>{
        console.log(response)
        const games: TeamCard[] = response.data.map((teamCard) => {
          return {
            id: teamCard.id,
            home_team: teamCard.home_team,
            visitor_team: teamCard.visitor_team,
            home_team_score: teamCard.home_team_score,
            visitor_team_score: teamCard.visitor_team_score
          };
        });
        this.gameResults = games
      },
      error:(err)=>{
        console.error('Error fetching results:', err);
      }
    })
  }

}
