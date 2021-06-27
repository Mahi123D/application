import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  token: any;
  headers: any;

  constructor() { 
    this.token = localStorage.getItem("token");
  }
  
  getHeader(){
    this.headers = new HttpHeaders()
    .set('Authorization', this.token)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

    return this.headers;
  }
      

}
