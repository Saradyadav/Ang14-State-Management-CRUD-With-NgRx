import { Component, OnInit } from '@angular/core';
import { Book } from '../store/book';
import { Store } from '@ngrx/store';
import { invokeSaveBookAPI } from '../store/books.action';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  /**
   *
   */
  constructor(private store:Store) {}
    bookForm : Book = {
      id : 0,
      author : '',
      title :'',
      cost : 0
    }
  
  ngOnInit(): void {
  //  throw new Error('Method not implemented.');
  }

  save(){
     this.store.dispatch(invokeSaveBookAPI())
  }
  

}
