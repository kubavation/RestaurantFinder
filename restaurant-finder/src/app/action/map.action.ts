import { Location } from './../map/model/Location';
import { createAction, props } from '@ngrx/store'

export const findLocation = createAction(
    '[MapSearchInput] FindLocation',
    props<{ location: Location}>()
)