import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ALLTeams ,OneGame, TeamCard} from 'src/app/models/models'


@Component({
  selector: 'app-track-teams',
  templateUrl: './track-teams.component.html',
  styleUrls: ['./track-teams.component.css']
})
export class TrackTeamsComponent implements OnInit{
  teamId: string = "";
  all_teams: ALLTeams[] = [];
  one_team_games : OneGame[]=[];
  last_12days_dates:string[]=[]
  loaded_ids:string[]=[]
  constructor(
    private api: ApiService, 
    private router:Router
    ) { }

  ngOnInit():void {
    this.api.getTeams().subscribe({
      next:(res: Object) => {
        const teamResponse = res as { data: ALLTeams[] };
        this.all_teams = teamResponse.data;
      },
      error:(err)=>{
      }
    });
    if(sessionStorage.getItem("one_team_games")){
      this.one_team_games = JSON.parse(sessionStorage.getItem("one_team_games")!)
    }
    if(sessionStorage.getItem("loaded_ids")){
      this.loaded_ids = JSON.parse(sessionStorage.getItem("loaded_ids")!)
    }
  }


  trackTeam():void{
    if(!this.loaded_ids.includes(this.teamId)){
      this.addToGamesArray()
    }else{
      alert("Already tracking, please select other")
    }
  }

  addToGamesArray():void{
    this.api.getLast12Days(this.teamId).subscribe({
      next:(res:object)=>{
        this.loaded_ids.push(this.teamId)
        sessionStorage.setItem("loaded_ids",JSON.stringify(this.loaded_ids))
        let pointsScored:number=0
        let pointsConceded:number=0
        let winloss:string[]=[]
        let avgPointsScored:number = 0
        let avgPointsConceded:number = 0
        let full_name:string=""
        let conference:string=""
        let abbreviation:string=""
        const cardResponse = res as {data:TeamCard[]}
        cardResponse.data.forEach((team)=>{
          if (team.home_team.id == parseInt(this.teamId)) {
            full_name = team.home_team['full_name']
            conference = team.home_team['conference']
            abbreviation = team.home_team['abbreviation']
            pointsScored = pointsScored + team.home_team_score;
            pointsConceded = pointsConceded + team.visitor_team_score;
            
            if (team.home_team_score > team.visitor_team_score) {
              winloss.push('W');
            } else if (team.home_team_score < team.visitor_team_score) {
              winloss.push('L');
            }
          }else{
            full_name = team.visitor_team['full_name']
            conference = team.visitor_team['conference']
            abbreviation = team.visitor_team['abbreviation']
            pointsScored = pointsScored + team.visitor_team_score;
            pointsConceded = pointsConceded + team.home_team_score;
            if (team.home_team_score < team.visitor_team_score) {
              winloss.push('W');
            } else if (team.home_team_score > team.visitor_team_score) {
              winloss.push('L');
            } else {
              return;
            }
          }
          
        })
        avgPointsScored = Math.round(pointsScored / cardResponse.data.length)
        avgPointsConceded = Math.round(pointsConceded / cardResponse.data.length)
        this.one_team_games.push({
          winloss:winloss,
          avgPointsConceded:avgPointsConceded,
          avgPointsScored:avgPointsScored,
          full_name:full_name,
          conference:conference,
          abbreviation:abbreviation,
          teamId:this.teamId
        })
        sessionStorage.setItem("one_team_games",JSON.stringify(this.one_team_games))
      },
      error:(err)=>{
      }
    })
  }

  removeItem(index: number,teamId:string): void {
    this.one_team_games.splice(index, 1);
    this.loaded_ids=this.loaded_ids.filter(id => id!=teamId)
    sessionStorage.setItem("loaded_ids",JSON.stringify(this.loaded_ids))
    sessionStorage.setItem("one_team_games",JSON.stringify(this.one_team_games))
  }

  seeGameResults(teamId:string,conference:string,name:string,abbrevation:string):void{
    sessionStorage.setItem("conference",conference)
    sessionStorage.setItem("name",name)
    sessionStorage.setItem("abbrevation",abbrevation)
    this.router.navigate([`/results/${teamId}`])
  }
  
}
