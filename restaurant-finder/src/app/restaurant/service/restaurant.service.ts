import { environment } from './../../../environments/environment';
import { Location } from './../../map/model/Location';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private basicUrl = 'https://developers.zomato.com/api/v2.1/search';

  constructor(private http: HttpClient) { }


  findByLocation(location: Location) {
    return this.http.get<any>(this.basicUrl + '?count=10&lat=' + location.lat + '&lon=' + location.lng, //todo radius?
     {headers: this.buildHttpHeaders() });
  }


  buildHttpHeaders() {
    return new HttpHeaders({
      'user-key': environment.zomatoKey
    });
  }


}
