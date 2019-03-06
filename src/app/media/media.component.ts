import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from '../services/media.service';
import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  constructor( 
    private http: HttpClient , 
    private router : Router  , 
    private _media : MediaService  
     ) { }

  mediaForm = false;
  mediaList: any = [] ;
  //mediaDelList: any = [] ;
  cpage = 0 ;
  sort = "" ;
  respMessage = null;
  respError = null;
  addBtn = "Add";
  showImage = "";
  chbx = null;

 // mediaNull = {'id': null,'type':null,'name':null,'size':null} ;
  

  afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg,.png,.gif,.bmp,.mp3,.txt,.pdf,.doc,.docx",
    maxSize: "20",
    uploadAPI:  {
      url:"http://www.qrz.co.il/studio/vgromyko.info/projects/api/media.php",
      headers: {
        "Content-Type": "multipart/form-data"
      }
    },
    theme: 'dragNDrop',  
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn:false
};


  ngOnInit() {
    this.getFileList();
  }

  onSelect(clients){
    this.router.navigate(['/media']);
  }

  onPrewBtn(){
    if(this.mediaList){
      if(Number(this.mediaList.paging.prew) >= 0 ){ 
      this.cpage = this.mediaList.paging.prew ;
      this.getFileList();
      }
    } 
  }

  onNextBtn(){
    if(this.mediaList){
      if(Number(this.mediaList.paging.next) < Number(this.mediaList.paging.total) ){
        this.cpage = this.mediaList.paging.next ;
        this.getFileList();
      }
    }
  }

     
  newFileForm(){
    this.respMessage = null;
    this.respError = null;
    this.showImage = "" ;
    if(this.addBtn == 'Add'){
      this.mediaForm = true;
      this.addBtn ='Hide';
    } else{
      this.mediaForm = false;
      this.addBtn ='Add';
    }



    

  }

  onSort(val){
    this.sort = val;
    this.getFileList();
  }


  showImg(img){
    this.addBtn = "Hide";
    this.newFileForm();
    var re = /.jpg|.png|.gif|.bmp/gi; 
    if (img.search(re) > 0) { 
      this.showImage = "<img src='http://www.qrz.co.il/studio/vgromyko.info/projects/media/"+img+"' width=400 >";
    }
    else this.showImage = "" ;
  }



  delFile(){

    var delList = "";
    let itemList ;
 
    let chbxcollection: HTMLCollection = document.getElementsByClassName('form-check-input'); 

    for(var i in chbxcollection ){
      if(chbxcollection[i].id !="checkbox"){
        var curChbx= chbxcollection[i]; 
          if( curChbx['checked'] !==  undefined && curChbx['checked']  == true ){
            delList += curChbx['title']+",";
          }
      }
    } 
   


 //console.log( delList)   ;

    this._media.deleteMedia(delList) 
      .subscribe( data => { 
        itemList = data; 
          if(itemList){
            this.respMessage = itemList.mess ;
            this.respError = itemList.err ;
          
          }
          
      this.mediaForm = false;
     // this.mediaDelList = new Array();
      this. getFileList() ;
    } ); 
/* */
  }


  getFileList(): void {
 
    let page = (this.cpage)?'&c='+this.cpage : '';
    let sort = (this.sort)?'&s='+this.sort : '';

      let itemList  ;
      this.mediaList = this._media.getMediaList(page,sort)
        .subscribe( data => { 
          itemList = data; 
          this.mediaList = itemList.data ;
          this.respError = itemList.err ;
 //console.log(this.mediaList);
        } );
  }



}




