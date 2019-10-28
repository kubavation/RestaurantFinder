import { createReducer, on } from '@ngrx/store';
import * as MapActions from '../action/map.action';

//to remove
export interface State {
    num: []
};

const initialState: State = {
    num: []
};
//

export const mapReducer = createReducer(
    initialState,
    on(MapActions.findLocation, (state, {lat, lng}) =>  { console.log('here ', lat, ' ', lng); return {...state, lat, lng}})
)

