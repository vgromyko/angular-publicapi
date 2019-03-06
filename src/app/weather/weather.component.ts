import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CitiesService } from '../services/cities.service' ;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor( private http: HttpClient , private router : Router  ,  public sanitizer: DomSanitizer , private _citiesService : CitiesService ) {

      this._citiesService.getCityList(this.cities);
   // console.log("city list is :" + this.cities);
  }
  
  title = 'Weather API';
  restItems: any;
  restItemsUrl:string = 'https://fcc-weather-api.glitch.me/api/';
  itemUrl ="";
  itemImage ="";
  latd = 56;
  long = 10;
  cities =[];

  ngOnInit() {

  }

  onSelect(weather){
    this.router.navigate(['/weather']);
  }

  getSelectedItem(lat,lon){
    this.latd = lat ;
    this.long = lon ;
    this.getFreeSearchItems(lat,lon) ;
  }
  

  getFreeSearchItems(lat,lon): void {
    this.latd  = lat;
    this.long = lon;

    this.restFreeSearchServiceGetFreeSearchItems(lat,lon)
      .subscribe(
        restItems => {
          this.restItems = restItems;
        //  console.log(this.restItems);
        }
      )
  }


 // Rest Items Service: Free search
 restFreeSearchServiceGetFreeSearchItems(lat,lon) {
     
  return this.http
    .get<any[]>(this.restItemsUrl  +'/current?lat='+lat+'&lon='+lon)
    .pipe(map(data => data));
  }

}
