import { Observable } from 'rxjs';
import { RestaurantService } from './../../service/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducer/map.reducer';
import { getChosenLocation } from 'src/app/selector/map.selector';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  private test$: Observable<any>;
  private test2: Array<any> = [];

  constructor(private restaurantService: RestaurantService,
              private store: Store<State>) { }

  ngOnInit() {
    // this.restaurantService.findByLocation({lat: 51.0898838, lng: 17.0372})
    //   .subscribe(r => {console.log(r); this.test = r} );
    this.store.pipe(select(getChosenLocation))
        .subscribe(l => { console.log('hereee ', l); if(l != null) this.restaurantService.findByLocation(l)
            .subscribe( r =>  { console.log(r); this.test2 = r } ); } );
    
  }



}
