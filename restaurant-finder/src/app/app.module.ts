import { mapReducer } from './reducer/map.reducer';
import { MapSearchComponent } from './map/component/map-search/map-search.component';
import { environment } from './../environments/environment';
import { MapComponent } from './map/component/map/map.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    StoreModule.forRoot(mapReducer), //todo make it generic 
    AgmCoreModule.forRoot({apiKey: environment.apiKey, libraries: ['places','geometry']})
  ],
  providers: [
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
