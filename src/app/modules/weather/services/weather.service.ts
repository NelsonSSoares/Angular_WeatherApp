import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WeatherService{

  private apiKey = '98ef7f34c3d089cc9c76e4f61dbdf694';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getWeatherDatas(cityName: string): Observable<any>{
    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=json&appid=${this.apiKey}`,{});
  }
}

