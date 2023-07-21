import { createReducer } from "@ngrx/store";
import { Book } from "./book";
import { booksFetchAPISucess } from "./books.action";

export const initialState: ReadonlyArray<Book> = [{
    "id": 1,
    "title": "Advance Data Structure and Algorithm",
    "author": "Narasimha Karumanchi",
    "cost": 550
}

];

export const bookReducer = createReducer(
    initialState,
    on(booksFetchAPISucess,)(state,)=>{
        
    }
)