import { Component, OnInit } from '@angular/core';
import { Book } from '../store/book';
import { Store, select } from '@ngrx/store';
import { selectBookById } from '../store/books.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { invokeUpdateBookAPI } from '../store/books.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    /**
     *
     */
    constructor(private store : Store,
      private route : ActivatedRoute,
      private router :Router ,
      private appStore: Store<Appstate>
      ) {
      //super();
      
    }
    bookForm : Book = {
      id : 0,
      author : '',
      title :'',
      cost : 0
    };

    ngOnInit(): void {
      let fetchFromData$ = this.route.paramMap.pipe(
        switchMap((param) => {
          var id = Number(param.get('id'));
          return   this.store.pipe(select(selectBookById(id)));
        })
      )
      fetchFromData$.subscribe((data)=>{
        if(data)
        {
          this.bookForm= {...data}
        }
        else{
          this.router.navigate(['/']);
        }
      })
    
    }
    update()
    {
      this.store.dispatch(invokeUpdateBookAPI({ payload : { ...this.bookForm}}));

      let appStatus$ = this.appStore.pipe(select(selectAppState))
      appStatus$.subscribe((data)=>{
       if(data.apiStatus === 'success')
       {
         this.appStore.dispatch(
           setAPIStatus({apiStatus:{ apiStatus:'', apiResponseMessage:''}})
         );
           this.router.navigate(['/']);
       }
      });
    }

  //   save(){
  //     this.store.dispatch(invokeSaveBookAPI({payload: {...this.bookForm}}));
  //     let appStatus$ = this.appStore.pipe(select(selectAppState))
  //     appStatus$.subscribe((data)=>{
  //      if(data.apiStatus === 'success')
  //      {
  //        this.appStore.dispatch(
  //          setAPIStatus({apiStatus:{ apiStatus:'', apiResponseMessage:''}})
  //        );
  //          this.router.navigate(['/']);
  //      }
  //     });
  //  }
}
