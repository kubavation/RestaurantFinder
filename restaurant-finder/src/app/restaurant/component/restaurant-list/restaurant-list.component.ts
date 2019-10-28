import { findLocation } from './../../../action/map.action';
import { Location } from './../../../map/model/Location';
import { Observable } from 'rxjs';
import { RestaurantService } from './../../service/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducer/map.reducer';
import { getChosenLocation } from 'src/app/selector/map.selector';
import { filter, map, tap, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  private places$: Observable<any>;

  constructor(private restaurantService: RestaurantService,
              private store: Store<State>) { }

  ngOnInit() {
    this.places$ =  this.store.pipe(
        select(getChosenLocation),
        filter(res => res),
        flatMap(r => this.restaurantService.findByLocation(r)),
        tap(r => console.log(r))
      );
  }

  setLocation(elem) {
    const location = {lat: parseFloat(elem.latitude + '0000'), lng:  parseFloat(elem.longitude + '0000')}; //because of api low accuracy
    this.store.dispatch(findLocation({location}));
  }

}
