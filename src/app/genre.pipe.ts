import { Pipe, PipeTransform } from '@angular/core';
import { Book } 			   from './app.component';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  transform(items: Book[], genre?: string): Book[] {
  	if(genre && genre !== 'All genres'){
    	return items.filter(item => item.genre === genre);
  	}
  	return items;
  }

}
