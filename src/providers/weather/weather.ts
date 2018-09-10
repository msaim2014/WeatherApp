import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

//allows for injection as a dependency
@Injectable()
export class WeatherProvider {
  public url:any;

  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
    this.url='https://api.openweathermap.org/data/2.5/weather?q=';
    //https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=5ba5e75ef29a1366b7e47d5fbb1503d9
  }

  //returns an observable so you want to use map so it can be subscribed to fetch results
  getWeather(city, country){
    var apiKey:string='5ba5e75ef29a1366b7e47d5fbb1503d9';

    //returns an observable
    return this.http.get(this.url + city + ',' + country + '&appid=' + apiKey);
  }

}
