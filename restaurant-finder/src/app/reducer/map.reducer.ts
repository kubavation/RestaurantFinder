import { Location } from './../map/model/Location';
import { createReducer, on } from '@ngrx/store';
import * as MapActions from '../action/map.action';

//to remove
export interface State {
    location: Location;
}

const initialState: State = {
    location: null
};
//

export const mapReducer = createReducer(
    initialState,
    on(MapActions.findLocation, (state, {location}) =>  { console.log('here ', location); return {...state, location}})
)

