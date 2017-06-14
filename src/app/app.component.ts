import { Component, OnInit } from '@angular/core';
import * as moment 			 from 'moment';
import * as _ 				 from 'underscore';

export class Book {
	authorGender: string
	authorName: string;
	bookName: string;
	date: any;
	genre: string;
}

const authorNames: [string] = ['Stephen', 'King', 'Alice', 'Crawford', 'Li', 'Bruce'];
const bookNames: [string] = ['Harry', 'also', 'cards', 'like', 'weed', 'and', 'rap'];

let index = 0;
let firstPrevClick = true;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	ALLBOOKS: number = 10e4;
	allBooks = [];
	authorGenders: [string] = ['Boy/Girl', 'Boy', 'Girl'];
	bookPerPage = 100;
	chunkBooks = [];
	checkedGender: string;
	checkedGenre: string;
	genres: [string] = ['All genres', 'Fantasy', 'Crime', 'Horror', 'Comedy', 'Finance'];
	nextLimit: boolean = true;
	prevLimit: boolean = false;
	title = 'Booklist app';
	visibleBooksCount: string = '';

	constructor() { }

	ngOnInit() {
		for (let i: number = 0; i < this.ALLBOOKS; i++) {
			let createdBook: Book = this.createBook(); 
			this.allBooks.push(createdBook);
		}
		this.next();
	}

	next(): void {
		if(!firstPrevClick){
			this.chunkBooks = this.allBooks.slice(index  + this.bookPerPage , index + 2 *this.bookPerPage);

			this.prevLimit = (index + this.bookPerPage) !== 0;
			this.nextLimit = (index + 2 *this.bookPerPage) < this.allBooks.length;

			this.visibleBooksCount = `${index  + this.bookPerPage} ... ${index + 2 *this.bookPerPage}`;

			index = index + 2*this.bookPerPage;
			firstPrevClick = true;
		} else {
			this.chunkBooks = this.allBooks.slice(index, index + this.bookPerPage);

			this.prevLimit = index !== 0;
			this.nextLimit = (index + this.bookPerPage) < this.allBooks.length;

			this.visibleBooksCount = `${index} ... ${index + this.bookPerPage}`;
			index = index + this.bookPerPage;	
		}

	}

	prev(): void {
		if(firstPrevClick) {
			this.chunkBooks = this.allBooks.slice(index - 2*this.bookPerPage, index - this.bookPerPage);
			this.visibleBooksCount = `${index - 2*this.bookPerPage} ... ${index - this.bookPerPage}`;

			this.prevLimit  = (index - 2*this.bookPerPage) !== 0;
			this.nextLimit = (index - this.bookPerPage) < this.allBooks.length;
			index = index - 2*this.bookPerPage;
			firstPrevClick = false;
		} else {
			this.chunkBooks = this.allBooks.slice(index - this.bookPerPage, index);
			this.visibleBooksCount = `${index - this.bookPerPage} ... ${index}`;
			
			this.prevLimit = (index - this.bookPerPage) !== 0;
			this.nextLimit = (index) < this.allBooks.length;
			index = index - this.bookPerPage;
		}

	}

	filterBy (item: string, group: string): void {
		if(group === 'genderGroup'){
			this.checkedGender = item;
		} else  {
			this.checkedGenre = item;
		}
	}

	sortBy (sortParam: string): void {
		this.chunkBooks = _.sortBy(this.chunkBooks, sortParam);

	}

	lastFridayForMonth (monthMoment): any {
	 	let lastDay = monthMoment.endOf('month');
	 	switch (lastDay.day()) {
	    case 6:
	     	return lastDay.subtract(1, 'days');
	    default:
	     	return lastDay.subtract(lastDay.day() + 2, 'days');
	 	}
	}

	onHalloween(momentDate): boolean {
		return momentDate.format('MMM Do') === 'Oct 27th';
	}

	isLastFriday(momentDate): boolean {
		let copyOfMomentDate = moment(momentDate);
		let strMomentDate = momentDate.format('dddd Do MMMM YYYY');
		let lastFridayMonth = this.lastFridayForMonth(copyOfMomentDate).format('dddd Do MMMM YYYY');
		return strMomentDate === lastFridayMonth;
	}

	getPublishDate(): any {
		let randomDate = moment().date(_.random(0, -3000));
		return randomDate;
	}

	createAuthorName(authorNames): string {
		let nameSurname = [];
		for (let i: number = 0; i < 2; i++) {
			let randNumber = _.random(0, authorNames.length - 1);
			nameSurname.push(authorNames[randNumber]);
		}
		return nameSurname.join(' ');
	}

	createBookName(): string {
		let bookName = _.shuffle(bookNames).join(' ');
		let bookWithCapLetter = this.capitalizeFirstLetter(bookName);
		return bookWithCapLetter;
	}

	capitalizeFirstLetter(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	randomize(arr): string {
		return arr[_.random(1, arr.length - 1)];
	}

	createBook(): Book {
		let book = {} as Book;
		book.authorName = this.createAuthorName(authorNames);
		book.authorGender = this.randomize(this.authorGenders);
		book.bookName = this.createBookName();
		book.genre = this.randomize(this.genres);
		book.date = this.getPublishDate();
		return book;
	}
}
