import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Book } from './book';

import { APIEndpointURLs } from '../api-endpoint-urls';



@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiServerUrl = APIEndpointURLs.bookUrl;

  constructor(private http: HttpClient) { }

  public getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.apiServerUrl}/all`);
  }

  public addBooks(Book:Book): Observable<Book>{
    return this.http.post<Book>(`${this.apiServerUrl}/new`, Book);
  }

  public updateBooks(Book:Book): Observable<Book[]>{
    return this.http.put<Book[]>(`${this.apiServerUrl}/update`, Book);
  }

  public deleteBooks(BookId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${BookId}`);
  }
  
}