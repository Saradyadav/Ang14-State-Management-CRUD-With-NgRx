import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { booksFetchAPISucess, deleteBookAPISuccess, saveBookAPISucess, updateBookAPISuccess } from "./books.action";

export const initialState: ReadonlyArray<Book> = [
//     {
//     "id": 1,
//     "title": "Advance Data Structure and Algorithm",
//     "author": "Narasimha Karumanchi",
//     "cost": 550
// }

];

export const bookReducer = createReducer(
    initialState,
    on(booksFetchAPISucess,(state,{allBooks})=> {
       return allBooks;
    }),
    on(saveBookAPISucess,(state,{response}) => {
        let newState = [...state];
        newState.unshift(response);
        return newState;
    }),
    on(updateBookAPISuccess,(state,{response}) => {
        let newState = state.filter(_ => _.id !== response.id);
        newState.unshift(response);
        return newState;
    }),
    on(deleteBookAPISuccess,(state,{id}) => {
        let newState = state.filter(_ => _.id !== id);
        //newState.unshift(response);
        return newState;
    })


)