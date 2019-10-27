import { createAction, props } from '@ngrx/store'

const findLocation = createAction(
    '[MapSearchInput] FindLocation',
    props<{ lat: number, lng: number}>()
)