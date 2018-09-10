import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { SettingsPage } from '../settings/settings';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather:any;
  location:{city:string, country:string};
  icon_url;
  kelvin;
  fahrenheit;
  //data:string;
  message:string;
  data=[];
  display:boolean;

  //when you inject a (weatherProvider) dependency it goes into the constructor parameters
  constructor(
   public navCtrl: NavController,
   private weatherProvider: WeatherProvider,
   private storage:Storage,
   public navParams: NavParams) {

    //this.data=navParams.get('weatherLocations');
    //console.log("passed data:", this.data);

   }

  //activates when the component is loaded
  ionViewWillEnter(){
    console.log("Home Page Loaded");
    this.storage.get('location').then((response)=>{
      if(response!=null){
        let empty=[];
        this.data = empty.concat(response);
        console.log("Yes local storage", this.data);
        this.display=false;
      }
      else{
        this.message="Please add a city and country";
        console.log("No Data");
        this.display=true;
      }

    });

  }

  addCity(){
    this.navCtrl.push(SettingsPage);
  }

  itemSelected(item){
    this.navCtrl.push(DetailsPage,{weatherLocation: item});
  }
}
