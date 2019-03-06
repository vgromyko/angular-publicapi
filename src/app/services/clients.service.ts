import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpErrorResponse} from '@angular/common/http';
//import {Client} from "../model/user.model";
import { map , catchError, retry} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
 


@Injectable({
  providedIn: 'root'
})
export class ClientsService {
   constructor(private http: HttpClient ) {
  }


  baseUrl: string = 'http://www.qrz.co.il/studio/vgromyko.info/projects/api/index.php?key=backgroundFFFFFF';

  
/*

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

*/



  getClients(page,sort) {

   //  console.log(this.baseUrl + '&getData=1&userList=1'+page+sort);
    return this.http
      .get<any[]>(this.baseUrl + '&getData=1&userList=1'+page+sort)
      .pipe(map(data => data));
  }

  deleteClient(id) {
   // console.log("START deleteClient "+this.baseUrl + '&delData=1&userId='+id);
    return this.http
    .get<any[]>(this.baseUrl + '&delData=1&userId='+id)
    .pipe(map(data => data));
  }

  updateClient(client) {
    //console.log(this.baseUrl + '&putData=1&userId='+client.userId);
    const body = {
      id : client.userId,
      fname : client.fname,
      lname : client.lname,
      login : client.llogin,
      passw : client.passw,
      phone : client.phone,
      email : client.email,
      data : client.data
    };

//JSON.stringify(  userId : client.userId,


    const  posHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      })
    };


  //  'Access-Control-Allow-Origin' : '*' ,
  //  'Content-Type': 'application/json'  'Content-Type': 'multipart/form-data',
//crossorigin  ,anonymous  my-auth-token
  //'Authorization': 'my-auth-token'  "Accept": "multipart/form-data"
  //'Content-Type': 'application/form-data',multipart/form-data'  boundary="boundary"  
//application/x-www-form-urlencoded
//'Access-Control-Allow-Origin': '*',  origin-list
   // console.log(this.http.head.toString);

  
    var url =this.baseUrl + '&putData=1&userId='+body.id;
        url += '&fname='+body.fname;
        url += '&lname='+body.lname;
        url += '&login='+body.login;
        url += '&passw='+body.passw;
        url += '&phone='+body.phone;
        url += '&email='+body.email;    
        url += '&data='+body.data;    
//console.log(url);

/*
    return this.http.get<any[]>(url)
            .pipe(map(data => data));
  */ 


// console.log(this.baseUrl + '&putData=1&userId='+body.id);
    return  this.http.post( 
        this.baseUrl + '&putData=1&userId='+body.id, 
        body ,
        posHttpOptions )
        .pipe(map(data => data));
 }





  /*
  getClientById(id: number) {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  createClient(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  updateClient(user: User) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  deleteClient(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
*/

}
