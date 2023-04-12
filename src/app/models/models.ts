export interface ALLTeams {
  id: number;
  full_name: string;
}

export interface TeamCard{
  home_team:Team,
  visitor_team:Team,
  home_team_score:number,
  visitor_team_score:number,
  id:number,
}

export interface GamesApiResponse {
  data: TeamCard[];
}

export interface Team{
    id: number,
    abbreviation: string,
    city: string,
    conference: string,
    division: string,
    full_name: string,
    name: string
}

export interface TeamsApiResponse {
  data: Team[];
}


export interface OneGame{
  winloss:string[],
  avgPointsConceded:number,
  avgPointsScored:number,
  full_name:string,
  conference:string,
  abbreviation:string,
  teamId:string
}

