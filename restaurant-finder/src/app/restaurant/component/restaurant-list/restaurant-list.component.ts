import { RestaurantService } from './../../service/restaurant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.findByLocation({lat: 51.0898838, lng: 17.0372})
      .subscribe(r => console.log(r));
  }



}
