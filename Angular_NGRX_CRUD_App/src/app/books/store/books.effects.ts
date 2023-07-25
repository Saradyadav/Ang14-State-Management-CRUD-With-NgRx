import { Injectable } from "@angular/core";
import { Actions,createEffect, ofType } from "@ngrx/effects";
import { BooksService } from "../books.service";
import { booksFetchAPISucess, invokeBooksAPI, invokeSaveBookAPI, invokeUpdateBookAPI, saveBookAPISucess, updateBookAPISuccess } from "./books.action";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { Store, select } from "@ngrx/store";
import { Appstate } from "src/app/shared/store/appstate";
import { setAPIStatus } from "src/app/shared/store/app.action";
import { selectBooks } from "./books.selector";
import { StoreDevtoolsConfig } from "@ngrx/store-devtools";

@Injectable()
export class BooksEffects {
    constructor(
    private actions$:Actions,
    private bookService:BooksService,
    private appStore: Store<Appstate>,
    private store: Store
    ){}

    loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
        ofType(invokeBooksAPI),
        withLatestFrom(this.appStore.pipe(select(selectBooks))),
        switchMap(([, booksFromStore]) => {
            if(booksFromStore.length > 0){
                return EMPTY;
            } 
            return this.bookService.get()
            .pipe(map((data) =>  booksFetchAPISucess({allBooks : data})));
        })
    )
    );

    saveNewBooks$ = createEffect(() =>
           this.actions$.pipe(
            ofType(invokeSaveBookAPI), 
            switchMap((action) => {
                 this.appStore.dispatch(
                    setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
                return this.bookService
                .create(action.payload)
                .pipe(map((data) => {
                    this.appStore.dispatch(
                        setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
                    return saveBookAPISucess({response: data })
                }
                ));
                 })
            )
            );

            //update books
            updateBooks$ = createEffect(() =>
           this.actions$.pipe(
            ofType(invokeUpdateBookAPI), 
            switchMap((action) => {
                 this.appStore.dispatch(
                    setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
                return this.bookService
                .update(action.payload)
                .pipe(map((data) => {
                    this.appStore.dispatch(
                        setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
                    return updateBookAPISuccess({response: data })
                }
                ));
                 })
            )
            );
         }


