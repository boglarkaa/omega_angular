import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public books: Book[] | undefined;
  public editBook: Book | undefined;
  public deleteBook: Book | undefined;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  public getBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (value: Book[]) => {
         this.books = value;
        console.log(this.books);
      },
      error: (error: any) => {
        alert(error.message);
      }
    });
    
  }

  public onAddBook(addForm: NgForm): void {
    this.bookService.addBooks(addForm.value).subscribe({
      next: (response: Book) => {
        console.log(response);
        this.getBooks();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }
  

  public onUpdateBook(Book: Book): void {
    this.bookService.updateBooks(Book).subscribe({
      next: (response: Book[]) => {
        console.log(response);
        this.getBooks();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  

  public onDeleteBook(BookId: number): void {
    this.bookService.deleteBooks(BookId).subscribe({
      next: () => {
        console.log("Deletion successful");
        this.getBooks();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  
  public searchBooks(key: string): void {
    console.log(key);
    const results: Book[] = [];
    for (const book of this.books!) {
      if (
        book.title && book.title.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        book.subtitle && book.subtitle.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        book.publishingHouse && book.publishingHouse.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        book.author && book.author.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(book);
      }
    }
    this.books = results;
    if (!key) {
      this.getBooks();
    } else if (results.length === 0) {

    }
  }
  

  public onOpenModal( mode: string,book?: Book): void {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addBookModal');
    }
    if (mode === 'edit') {
      this.editBook = book;
      button.setAttribute('data-bs-target', '#updateBookModal');
    }
    if (mode === 'delete') {
      this.deleteBook = book;
      button.setAttribute('data-bs-target', '#deleteBookModal');
    }
    container.appendChild(button);
    button.click();
  }



}