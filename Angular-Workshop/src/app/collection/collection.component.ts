import { Component, OnInit } from '@angular/core';
import { IBook } from '../ibook';
import { MdSnackBar } from "@angular/material";
import { DataService } from '../services/data.service';

@Component({
    selector: 'my-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

    constructor(private _dataService: DataService, private _snackBar: MdSnackBar) {
        this.startTime = new Date();
        this.startTime.setHours(10, 0);
        this.endTime = new Date();
        this.endTime.setHours(15, 0);
    }

    ngOnInit(): void {
        this.getBooks();

    }

    pageTitle: string = 'Books';

    public books: Array<IBook>;

    startTime: Date;

    endTime: Date;

    showOperatingHours: boolean = false;

    getBooks(): void {
        this._dataService.getBooks()
            .subscribe(
            books => this.books = books,
            error => this.updateMessage(<any>error, 'ERROR'));
    }

    updateMessage(message: string, type: string): void {
        if (message) {
            this._snackBar.open(`${type}: ${message}`, 'DISMISS', {
                duration: 3000
            });
        }
    }

    onRatingUpdate(book: IBook): void {
        this.updateMessage(book.title, " Rating has been updated");
    }

}
