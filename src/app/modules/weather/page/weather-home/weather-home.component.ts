import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from 'src/app/models/interfaces/weather-data';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
 
  private readonly destroi$: Subject<void> = new Subject<void>();
  intialCity = 'São Paulo';
  weatherData!: WeatherData;
  searchIcon = faMagnifyingGlass;

  constructor(
    private weatherService: WeatherService
  ){}

  ngOnInit(): void {
    this.getWeatherDatas(this.intialCity);
  }

  getWeatherDatas(cityName:string): void {
    this.weatherService.getWeatherDatas(cityName)
    .pipe(
      takeUntil(this.destroi$)
    )
    .subscribe({
      next: (response)=>{
        response && (this.weatherData = response); //if
        console.log(this.weatherData);
        
      },
      error: (error)=>{
        console.error(error);
      }
    })
  }

  onSubmit(): void {
    this.getWeatherDatas(this.intialCity);
    this.intialCity = '';
  }

  ngOnDestroy(): void {
    this.destroi$.next();
    this.destroi$.complete();
  }
}
