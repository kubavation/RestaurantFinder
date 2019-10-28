import { Location } from './../../model/Location';
import { findLocation } from './../../../action/map.action';
import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducer/map.reducer';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {

  @ViewChild('searchInput', {static: true})
  public searchElementRef: ElementRef;

  constructor(private mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private store: Store<State>) { }

  ngOnInit() {
    this.init();
  }

  init() {

    this.mapsApiLoader.load().then(() => {

      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement, {
          types: ['address']
      });

      autocomplete.addListener('place_changed', () => this.onPlaceChanged(autocomplete));
  });

}

onPlaceChanged(element) {
  this.zone.run(() => {
    console.log('on place changed')
    const place: google.maps.places.PlaceResult = element.getPlace();

    if (place.geometry == null) {
      return;
    }

    const location: Location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };

    this.store.dispatch(findLocation({location}));
  });
  
}




}
