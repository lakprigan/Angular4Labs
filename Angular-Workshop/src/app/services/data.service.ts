import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IBook } from "../ibook";
import 'rxjs/Rx';

@Injectable()
export class DataService {

  private _booksUrl = 'assets/api/books.json';

  constructor(private _http: Http) { }

 getBooks(): Observable<IBook[]> {
    return this._http.get(this._booksUrl)
      .map((response: Response) => {
        let data: IBook[] = <IBook[]>response.json();
        localStorage.setItem('books', JSON.stringify(data));
        return data;
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
