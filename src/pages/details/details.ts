import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemReorder } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  public item: any;
  public location:{city:string, country:string};
  public weather:any;
  public icon_url:string;
  public kelvin:any;
  public fahrenheit:any;
  public humidity:any;
  public description:any;
  public index:any;
  public errorMsg:string;

  constructor(
    public navCtrl: NavController,
    private storage:Storage,
    public navParams: NavParams,
    private weatherProvider: WeatherProvider) {

      this.item=navParams.get('weatherLocation');
      console.log("passed city", this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  ionViewWillEnter(){
      this.location=this.item;

      this.weatherProvider.getWeather(this.location.city, this.location.country).subscribe(
        response=>{
          //manipulating the data
          this.weather=response;
          this.icon_url = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';
          this.kelvin=response.main.temp;
          this.fahrenheit=(this.kelvin)*(9/5)-459.67;
          this.fahrenheit=this.fahrenheit.toFixed(2);
          this.humidity=response.main.humidity;
          this.description=response.weather[0].description;
        },
      error=>{
        console.log("Error Occured");
      });
  
  }

  deleteCity(item:any){

    this.storage.get('location').then((response)=>{
      console.log("Before Removal: ", response)
      let empty=[];
      let hold=empty.concat(response);
      
      for(let i=0; i<hold.length; i++){
        if(hold[i].city==item.city && hold[i].country==item.country){
          this.index=i;
        }
      }

      hold.splice(this.index, 1);
      console.log("After Removal: ", hold);
      this.storage.set('location', hold);
    });

    //navigating back to the homepage
    this.navCtrl.push(HomePage);
  }

}
