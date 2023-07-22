import { Injectable } from "@angular/core";
import { Actions,createEffect, ofType } from "@ngrx/effects";
import { BooksService } from "../books.service";
import { booksFetchAPISucess, invokeBooksAPI, invokeSaveBookAPI, saveBookAPISucess } from "./books.action";
import { map, switchMap } from "rxjs";

@Injectable()
export class BooksEffects {
    constructor(private actions$:Actions,
    private bookService:BooksService){}

    loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
        ofType(invokeBooksAPI),
        switchMap(() => {
            return this.bookService.get()
            .pipe(map((data) =>  booksFetchAPISucess({allBooks : data}))
            );
        })
    )
    );

    saveNewBooks$ = createEffect(() => 
        
           this.actions$.pipe(
            ofType(invokeSaveBookAPI), 
            switchMap((action) => {
                return this.bookService
                .create(action.payload)
                .pipe(map((data) => saveBookAPISucess({responce: data })))
            })
        );
    
    )
}

