import { createReducer } from "@ngrx/store";
import { Book } from "./book";

export const initialState: ReadonlyArray<Book> = [{
    "id": 1,
    "title": "Advance Data Structure and Algorithm",
    "author": "Narasimha Karumanchi",
    "cost": 550
}

];

export const bookReducer = createReducer(
    initialState
)