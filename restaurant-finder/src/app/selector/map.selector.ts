import { Location } from './../map/model/Location';
import { State } from '../reducer/map.reducer';
import { createSelector } from '@ngrx/store';


//todo selector
export const getLocationState = (state: any) => state.maps;
//export const getChosenLocation = (state: State) => { console.log(state); return state};

export const getChosenLocation = createSelector(
    getLocationState,
    (state: any) => {console.log(state); return state.location;}
);
