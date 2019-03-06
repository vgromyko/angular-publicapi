import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from '../services/clients.service';
import { HttpClient } from '@angular/common/http';
//import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor( private router : Router , private _clients : ClientsService , private http: HttpClient ) { }
  userForm = false;
  clientsList: any = [] ;
  cpage = 0 ;
  sort = "" ;
  chbx = null;
 
 
  respMessage = null;
  respError = null;

  form = {
    'userId':null,
    'llogin':null,
    'passw':null,
    'fname':null,
    'lname':null,
    'email':null,
    'phone':null,
    'data':null
  }

  ngOnInit() {
    this.getClientList();
  }
  
 
  onSelect(clients){
    this.router.navigate(['/clients']);
  }

  onPrewBtn(){
    if(this.clientsList){
      if(Number(this.clientsList.paging.prew) >= 0 ){ 
      this.cpage = this.clientsList.paging.prew ;
      this.getClientList();
      }
    } 
  }

  onNextBtn(){
    if(this.clientsList){
      if(Number(this.clientsList.paging.next) < Number(this.clientsList.paging.total) ){
        this.cpage = this.clientsList.paging.next ;
        this.getClientList();
      }
    }
  }

  onSort(val){
    this.sort = val;
    this.getClientList();
  }

  newClientForm(){
    this.form  = {'userId':null,'llogin':null,'passw':null,'fname':null,'lname':null,'email':null,'phone':null,'data':null}
    this.respMessage = null;
    this.respError = null;
    this.userForm = true;
  }

  fillClientForm(id){
    this.respMessage = null;
    this.respError = null;
    this.userForm = true;
    this.setClientForm(id) ;
  }

  delClient(){

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
//console.log(delList);

    this._clients.deleteClient(delList) 
      .subscribe( data => { 
        itemList = data; 
          if(itemList){
            this.respMessage = itemList.mess ;
            this.respError = itemList.err ;
          
          }
      this.userForm = false;
      this.getClientList() ;
    } ); 
/**/
  }
 


  setClientForm(id){

    this.clientsList.data.forEach(  function(item , i ){
        if( item.id == id ){

          this.form.userId = item.id;
          this.form.llogin = item.login;
          this.form.passw = item.passw;
          this.form.fname = item.fname;
          this.form.lname = item.lname;  
          this.form.email = item.email;
          this.form.phone = item.phone;
          return ;
        }},this );
  }


  getClientList(): void {
 
    let page = (this.cpage)?'&c='+this.cpage : '';
    let sort = (this.sort)?'&s='+this.sort : '';

      let clsList  ;
      this.clientsList = this._clients.getClients(page,sort)
        .subscribe( data => { 
          clsList = data; 
          this.clientsList = clsList.data ;
          this.respError = clsList.err ;
        } );

    
  }



    
onSubmit(f) {

  let clsList : any ;
  if (f.valid) {
     this._clients.updateClient(this.form) 
        .subscribe( data => { 
          clsList = data; 
          if(clsList){
             this.respMessage = clsList.mess ;
            this.respError = clsList.err ;
          }
          this.userForm = false;
          this.getClientList();
        } );
  }
}



}
