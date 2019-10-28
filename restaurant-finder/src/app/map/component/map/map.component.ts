import { getChosenLocation } from './../../../selector/map.selector';
import { Location } from './../../model/Location';
import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { AgmMap, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducer/map.reducer';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { findLocation } from 'src/app/action/map.action';

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

  private zoom = 15;
  //for testing todo remove
  // public location: Location = {
  //   lat: 51.678418,
  //   lng: 7.809007,
  //   marker: {
  //     lat: 51.678418,
  //     lng: 7.809007,
  //     draggable: true
  //   },
  //   zoom: 20
  // };

  private location$: Observable<Location>;

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
    this.location$ = this.store.pipe(select(getChosenLocation));
}


  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        // this.location = {
        //   ...this.location,
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude,
        //   marker: {
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude,
        //     draggable: true
        //   }
        // };

      });
    }
  }


  markerCoords($event) {
    const location: Location = {
      lat: $event.coords.lat,
      lng: $event.coords.lng
    };

    this.store.dispatch(findLocation({location}));
  }
 
  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     console.log(results);
  //     console.log(status);
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }
 
  //   });
  
}
