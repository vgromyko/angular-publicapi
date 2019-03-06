import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { map , catchError, retry} from 'rxjs/operators';
//import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
   constructor(private http: HttpClient ) {
  }


  baseUrl: string = 'http://www.qrz.co.il/studio/vgromyko.info/projects/api/index.php?key=backgroundFFFFFF';

  getMediaList(page,sort) {

   //console.log(this.baseUrl + '&getFileList=1'+page+sort)
    return this.http
      .get<any[]>(this.baseUrl + '&getFileList=1'+page+sort)
      .pipe(map(data => data));
  }

  deleteMedia(id) {
// console.log("START deleteClient "+this.baseUrl + '&delFile=1&fileId='+id);
    return this.http
    .get<any[]>(this.baseUrl + '&delFile=1&fileId='+id)
    .pipe(map(data => data));
  }

}
