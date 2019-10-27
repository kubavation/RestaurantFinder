import { createAction, props } from '@ngrx/store'

export const findLocation = createAction(
    '[MapSearchInput] FindLocation',
    props<{ lat: number, lng: number}>()
)