import { getChosenLocation } from './../../../selector/map.selector';
import { Location } from './../../model/Location';
import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { AgmMap, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducer/map.reducer';
import { Observable } from 'rxjs';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private geocoder: any;

  @ViewChild(AgmMap, {static: false})
  private map: AgmMap;

  //for testing 
  public location: Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 15
  };

  private location$;

  constructor(public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper,
              public store: Store<State>) {

          this.mapsApiLoader = mapsApiLoader;
          this.zone = zone;
          this.wrapper = wrapper;
          this.mapsApiLoader.load().then(() => {
            this.geocoder = new google.maps.Geocoder();
      });
  }


  ngOnInit() {
    this.location.marker.draggable = true;
    //this.location$ = this.store.pipe(select(getChosenLocation));
    this.location$ = this.store.select(getChosenLocation);
}


  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.location = {
          ...this.location,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          marker: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            draggable: true
          }
        };

      });
    }
  }

}
