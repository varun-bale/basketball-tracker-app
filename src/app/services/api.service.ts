import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  last_12dates :string[]=[]
  constructor(private http: HttpClient) {
   }

  apiKey = environment.API_KEY
  apiHost = environment.API_HOST

  private headers = new HttpHeaders({
    'X-RapidAPI-Key': this.apiKey,
    'X-RapidAPI-Host': this.apiHost
  });

  getLast12Dates():string[]{
      const dates = [];
      for (let i = 1; i <= 12; i++) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const dateString = date.toISOString().slice(0, 10);
        dates.push(dateString);
      }
      return dates;
  }


  getTeams(): Observable<Object>{
   return this.http.get('https://free-nba.p.rapidapi.com/teams',{ 
   headers:this.headers
  })
  }

  getLast12Days(teamId:string): Observable<Object>{
    let Params = new HttpParams();
    this.getLast12Dates().forEach((date: string) => {
      Params = Params.append('dates[]', date);
    });
    Params = Params.append('team_ids[]', teamId);
    return this.http.get(`https://free-nba.p.rapidapi.com/games`, {
      headers: this.headers,
      params: Params
    })
  }

}
