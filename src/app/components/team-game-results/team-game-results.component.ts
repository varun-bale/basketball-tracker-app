import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {GameResults} from 'src/app/models/models';

@Component({
  selector: 'app-team-game-results',
  templateUrl: './team-game-results.component.html',
  styleUrls: ['./team-game-results.component.css']
})
export class TeamGameResultsComponent implements OnInit {

  teamId:string=""
  name:string=""
  conference:string=""
  gameResults:GameResults[]=[]
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
      next:(res:Object)=>{
        const cardResponse = res as {data:GameResults[]}
        this.gameResults = cardResponse.data
      },
      error:(err)=>{
      }
    })
  }

}
