import { Component, OnInit   } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-nasa',
  templateUrl: './nasa.component.html',
  styleUrls: ['./nasa.component.css']
})
export class NasaComponent implements OnInit {

  title = 'NASA images';
  restItems: any = {};
  
  restAssetItems: any =[];
  restItemsUrl:string = 'https://images-api.nasa.gov';
  itemUrl ="";
  itemImage ="";
  //collectionSrc = "" ;

  constructor( private http: HttpClient , private router : Router  ,  public sanitizer: DomSanitizer) { }

 
  ngOnInit() {
    //this.restItems.collection = [] ;
  }

  onSelect(nasa){
    this.router.navigate(['/nasa']);
  }

  onChangeText(dt){
    var adt = dt.split(',');
    this.itemUrl = adt[0];
    this.itemImage = "https://images-assets.nasa.gov/image/"+adt[1]+"/"+adt[1]+"~medium.jpg";
    //this.collectionSrc = adt[2];
    this.getAssetItems( adt[2] ) ;
  }


     //   Free search

  getFreeSearchItems(q:string): void {
     let restStr ;
    this.restFreeSearchServiceGetFreeSearchItems(q)
      .subscribe(
        restItems => {
          restStr = restItems;
          this.restItems = restStr.collection;
         // console.log(this.restItems);
        }
      )
  }


 // Rest Items Service: Free search
 restFreeSearchServiceGetFreeSearchItems(q) {
     
  return this.http
    .get<any[]>(this.restItemsUrl  +'/search?q='+q+'&media_type=image')
    .pipe(map(data => data));
  }





  getAssetItems(q:string): void {
     
    this.restGetAssetItems(q)
      .subscribe(
        restItems => {
          this.restAssetItems = restItems;
          //console.log(this.restAssetItems);
        }
      )
  }



 restGetAssetItems(q:string) {
     
  return this.http
    .get<any[]>(q)
    .pipe(map(data => data));
  }

}
