import { Component, OnInit } from '@angular/core';
import { Book } from '../store/book';
import { Store, select } from '@ngrx/store';
import { selectBookById } from '../store/books.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { invokeUpdateBookAPI } from '../store/books.action';

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
      private router :Router 
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
    }
}
