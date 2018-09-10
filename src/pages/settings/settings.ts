import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { Location } from '../../app/location';
import { WeatherProvider } from '../../providers/weather/weather';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {
  public city:string;
  public country:string;
  public display_message:boolean;
  public message:string="Incorrect city and state combination";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private weatherProvider:WeatherProvider) {

      this.storage.get('location').then((val)=>{
        if(val!=null){
          let location=val;
          this.city=location.city;
          this.country=location.country;
          console.log("My Data:", val);
        }
        else{
          this.city='Miami';
          this.country='US';
          console.log("No Data");
        }
      });
  }

  ionViewDidLoad() {
    this.display_message=false;
    console.log('ionViewDidLoad SettingsPage');
  }

   saveForm(){
    let location={
      city:this.city,
      country:this.country
    }

    this.weatherProvider.getWeather(location.city, location.country).subscribe(
      response=>{
        this.storage.get('location').then((res)=>{
          console.log('local storage', res);
          if(res!=null){
            let empty=[];
            let hold = empty.concat(res);
            hold.push(location);
            this.storage.set('location', hold);
            console.log("Yes local storage", hold);
    
            //navigating back to the homepage
            this.navCtrl.push(HomePage, {weatherLocations:hold});
          }
          else{
            let hold=[];
            hold.push(location);
            this.storage.set('location', hold);
            console.log("No local storage", hold);
            
            //navigating back to the homepage
            this.navCtrl.push(HomePage, {weatherLocations:hold});
          } 
          this.display_message=false;
        });
    
      },
      error=>{
        this.display_message=true;
    });
  }
}