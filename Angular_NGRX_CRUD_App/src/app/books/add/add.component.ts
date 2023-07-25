import { Component, OnInit } from '@angular/core';
import { Book } from '../store/book';
import { Store, select } from '@ngrx/store';
import { invokeSaveBookAPI } from '../store/books.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Router } from '@angular/router';
import { setAPIStatus } from 'src/app/shared/store/app.action';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  /**
   *
   */
  constructor(private store:Store,
    private appStore:Store<Appstate>,
    private router:Router) {}
    bookForm : Book = {
      id : 0,
      author : '',
      title :'',
      cost : 0
    };
  
  ngOnInit(): void {
  //  throw new Error('Method not implemented.');
  }

  save(){
     this.store.dispatch(invokeSaveBookAPI({payload: {...this.bookForm}}));
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
  

}
