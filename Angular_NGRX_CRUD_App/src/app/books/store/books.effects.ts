import { Injectable } from "@angular/core";
import { Actions,createEffect } from "@ngrx/effects";
import { BooksService } from "../books.service";

@Injectable()
export class BooksEffects {
    constructor(private action$:Actions,
    private bookService:BooksService){}

    loadAllBooks$ = createEffect
}
