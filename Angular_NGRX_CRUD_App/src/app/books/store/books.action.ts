import { createAction, props } from "@ngrx/store";
import {Book} from"./book";

export const invokeBooksAPI = createAction(
"[Books API] invoke books Fetch API"
)


export const booksFetchAPISucess = createAction(
    "[Books API] books fetch api sucess",
    props<{allBooks:Book[]}>()
    )

    export const invokeSaveBookAPI = createAction(
        "[Books API] invoke save book API",
        props<{allBooks:Book[]}>()
        )
    