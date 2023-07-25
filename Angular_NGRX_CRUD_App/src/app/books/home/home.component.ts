import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBooks } from '../store/books.selector';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../store/books.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';

declare var window: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  /**
   *
   */
  constructor(private store : Store,
    private appStore:Store<Appstate>,
   // private router: 
    ) {
    
  }

  books$ = this.store.pipe(select(selectBooks));
  deleteModal:any;
  idToDelete: number = 0;
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.deleteModal= new window.bootstrap.Modal(
      document.getElementById("deleteModel")
    );
  this.store.dispatch(invokeBooksAPI());
  }

  openDeleteModel(id : number){
    this.idToDelete = id;
    this.deleteModal.show();

  }
  confirmDelete(){
    this.store.dispatch(invokeDeleteBookAPI({id:this.idToDelete}));
    let appStatus$ = this.appStore.pipe(select(selectAppState))
      appStatus$.subscribe((data)=>{
       if(data.apiStatus === 'success')
       {
         this.appStore.dispatch(
           setAPIStatus({apiStatus:{ apiStatus:'', apiResponseMessage:''}})
         );

         //   this.router.navigate(['/']);
         this.deleteModal.hide();
       }
      });
     
  }

}
