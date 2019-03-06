import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected url : string = 'https://images-api.nasa.gov';

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) {}

  // Rest Items Service: Read all REST Items
  getAll() {
    return this.http
      .get<any[]>(this.url)
      .pipe(map(data => data));
  }
  
}
